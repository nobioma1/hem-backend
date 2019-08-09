const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

const testUser = {
  firstname: 'test',
  lastname: 'test',
  email: 'test@test.com',
  password: 'tester',
  profileURL: 'https://testimage.com/testimage.jpeg',
};

describe('Users', () => {
  it('Should Validate Request body', async () => {
    const res = await request.post('/api/v1/register');
    expect(res.status).toBe(422);
    expect(res.body.error).toBeInstanceOf(Array);
    expect(res.body.error.length).toBe(4);
  });

  it('Should Validate password Length to be 5', async () => {
    const res = await request
      .post('/api/v1/register')
      .send({ ...testUser, password: 'test' });
    expect(res.status).toBe(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error[0]).toEqual(
      'password length must be at least 5 characters long',
    );
  });

  it('Should Create a User', async () => {
    const res = await request.post('/api/v1/register').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual(`Welcome, ${testUser.firstname}`);
    expect(res.body).toHaveProperty('token');
  });

  it('Should Validate User does not exist', async () => {
    const res = await request.post('/api/v1/register').send(testUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual('User with Email already exists');
  });
});
