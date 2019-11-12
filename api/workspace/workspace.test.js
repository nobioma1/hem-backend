const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

const workspace = {
  name: 'testworkspace',
  title: 'Test Workspace',
};

describe('Workspace', () => {
  it('Should Create New Workspace', async done => {
    const { body } = await request
      .post('/api/v1/login')
      .send({ email: 'john@demo.com', password: 'demo' });
    const res = await request
      .post('/api/v1/workspace')
      .set('Authorization', body.token)
      .send(workspace);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(workspace.name);
    expect(res.body.title).toBe(workspace.title);
    expect(res.body.createdBy).toEqual('78d9446b-e132-4dc0-b7f7-abb420fd6ddf');
    done();
  });

  it('Should validate workspace body', async done => {
    const { body } = await request
      .post('/api/v1/login')
      .send({ email: 'john@demo.com', password: 'demo' });
    const res = await request
      .post('/api/v1/workspace')
      .set('Authorization', body.token)
      .send({ title: 'Workspace', name: 'no Spaces' });
    expect(res.status).toBe(422);
    done();
  });

  it('Should not create duplicate workspace', async done => {
    const { body } = await request
      .post('/api/v1/login')
      .send({ email: 'john@demo.com', password: 'demo' });
    const res = await request
      .post('/api/v1/workspace')
      .set('Authorization', body.token)
      .send(workspace);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Workspace already exists' });
    done();
  });

  it('Should get existing Workspace', async done => {
    const { body } = await request
      .post('/api/v1/login')
      .send({ email: 'john@demo.com', password: 'demo' });
    const res = await request
      .get('/api/v1/workspace/testworkspace')
      .set('Authorization', body.token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(workspace.name);
    expect(res.body.title).toBe(workspace.title);
    expect(res.body.createdBy).toEqual('78d9446b-e132-4dc0-b7f7-abb420fd6ddf');
    done();
  });

  it('Should return error if user is not existing', async done => {
    const { body } = await request
      .post('/api/v1/login')
      .send({ email: 'john@demo.com', password: 'demo' });
    const res = await request
      .get('/api/v1/workspace/wrong')
      .set('Authorization', body.token);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Workspace Does not exist' });
    done();
  });

  it('Should update existing workspace', async done => {
    const { body } = await request
      .post('/api/v1/login')
      .send({ email: 'john@demo.com', password: 'demo' });
    const res = await request
      .put('/api/v1/workspace/80b46cd9-9363-4a20-9b7c-41396cc4ecb9')
      .set('Authorization', body.token)
      .send({ title: 'Updated Workspace', name: 'updated' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Updated Workspace');
    expect(res.body.name).toBe('updated');
    done();
  });

  it('Should delete workspace', async done => {
    const { body } = await request
      .post('/api/v1/login')
      .send({ email: 'john@demo.com', password: 'demo' });
    const res = await request
      .delete('/api/v1/workspace/80b46cd9-9363-4a20-9b7c-41396cc4ecb9')
      .set('Authorization', body.token);
    expect(res.status).toBe(204);
    done();
  });
});
