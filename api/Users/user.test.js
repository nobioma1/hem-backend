const supertest = require('supertest');
const server = require('../server');
const { verifyToken } = require('../../helpers/authToken');
const { UserSecretToken } = require('../../models');

const request = supertest(server);

const testUser = {
  firstname: 'test',
  lastname: 'test',
  email: 'testuser@test.com',
  password: 'testee',
  profileURL: 'https://testimage.com/testimage.jpeg',
};

describe('Users', () => {
  it('Should Validate Request body', async (done) => {
    const res = await request.post('/api/v1/register');
    expect(res.status).toBe(422);
    expect(res.body.error).toBeInstanceOf(Array);
    expect(res.body.error.length).toBe(4);
    done();
  });

  it('Should Validate password Length to be 5', async (done) => {
    const res = await request
      .post('/api/v1/register')
      .send({ ...testUser, password: 'test' });
    expect(res.status).toBe(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error[0]).toEqual(
      'password length must be at least 5 characters long',
    );
    done();
  });

  it('Should Create a User', async (done) => {
    const res = await request.post('/api/v1/register').send(testUser);
    const details = await verifyToken(res.body.token);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(
      `Welcome, ${testUser.firstname}, Please check email to verify account`,
    );
    expect(res.body).toHaveProperty('token');
    expect(details).toHaveProperty('id');
    expect(details.email).toEqual(testUser.email);
    done();
  });

  it('Should get User profile', async (done) => {
    const { email, password } = testUser;
    const { body } = await request
      .post('/api/v1/login')
      .send({ email, password });
    const res = await request
      .get('/api/v1/profile/78d9446b-e132-4dc0-b7f7-abb420fd6ddf')
      .set('Authorization', body.token);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual('78d9446b-e132-4dc0-b7f7-abb420fd6ddf');
    expect(res.body.email).toEqual('john@demo.com');
    expect(res.body.firstname).toEqual('John');
    expect(res.body.lastname).toEqual('Doe');
    expect(res.body.isActive).toBeTruthy();
    done();
  });

  it('Should get return error if user does not exist', async (done) => {
    const { email, password } = testUser;
    const { body } = await request
      .post('/api/v1/login')
      .send({ email, password });
    const res = await request
      .get('/api/v1/profile/f4a14d98-0ffe-4ffb-b1b5-a305b23cb2dd')
      .set('Authorization', body.token);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'User Does not exist' });
    done();
  });

  it('Should Validate User Already Exists', async (done) => {
    await request.post('/api/v1/register').send(testUser);
    const res = await request.post('/api/v1/register').send(testUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual('User with Email already exists');
    done();
  });

  it('Should Login existing User', async (done) => {
    const { email, password } = testUser;
    const res = await request.post('/api/v1/login').send({ email, password });
    const details = verifyToken(res.body.token);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual(`Welcome, ${testUser.firstname}`);
    expect(details.email).toEqual(testUser.email);
    done();
  });

  it('Should Validate wrong email on login', async (done) => {
    const { password } = testUser;
    const res = await request
      .post('/api/v1/login')
      .send({ email: 'wrongtestuser@test.com', password });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'User with Email Does not exist' });
    done();
  });

  it('Should Validate User Password', async (done) => {
    const { email } = testUser;
    const res = await request
      .post('/api/v1/login')
      .send({ email, password: 'wrong' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid Username or Password' });
    done();
  });

  it('Should return error trying to verify account with wrong code', async (done) => {
    const { email, password } = testUser;
    const { body } = await request
      .post('/api/v1/login')
      .send({ email, password });
    const res = await request
      .post('/api/v1/verify')
      .set('Authorization', body.token)
      .send({ secretToken: 'ItIswrOnG' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid Token' });
    done();
  });

  it('Should resend verification', async (done) => {
    const { email, password } = testUser;
    const { body } = await request
      .post('/api/v1/login')
      .send({ email, password });
    const res = await request
      .post('/api/v1/resend-verification')
      .set('Authorization', body.token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Verification code, Resent!' });
    done();
  });

  it('Should Verify user using code to activate account', async (done) => {
    const { email, password } = testUser;
    const { body } = await request
      .post('/api/v1/login')
      .send({ email, password });
    const { id } = verifyToken(body.token);
    const secretToken = await UserSecretToken.findOne({
      where: { userId: id },
    });
    const res = await request
      .post('/api/v1/verify')
      .set('Authorization', body.token)
      .send({ secretToken: secretToken.token });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'User Account is Active' });
    done();
  });

  it('Should check if user is already active', async (done) => {
    const { email, password } = testUser;
    const { body } = await request
      .post('/api/v1/login')
      .send({ email, password });
    const res = await request
      .post('/api/v1/resend-verification')
      .set('Authorization', body.token);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'User Account is already active' });
    done();
  });
});
