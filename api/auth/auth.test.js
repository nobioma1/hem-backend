const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

describe('Authentication', () => {
  it('Should Check and Verify auth Token', async (done) => {
    const res = await request.post('/api/v1/workspace');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'jwt must be provided' });
    done();
  });

  it('Should Validate if User is Active', async (done) => {
    const { body } = await request
      .post('/api/v1/login')
      .send({ email: 'unknown@demo.com', password: 'demo' });    
    const res = await request
      .post('/api/v1/workspace')
      .set('Authorization', body.token).send({});
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      error: 'User Account is not active, Please Verify Account',
    });
    done();
  });
});
