
import request from 'supertest';
import { app } from '../../app';

it('returns 201 on succeful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@mc.com',
      password: 'password',
    }).expect(201);
});


it('returns 400 on invalid signup', async() =>{

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testcom',
      password: 'password',
    }).expect(400); 
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@co.com',
    password: '12',
  }).expect(400);
})

it('disallow duplicate email', async() =>{
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@com.com',
      password: 'password',
    }).expect(201); 
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@com.com',
    password: 'password',
  }).expect(401);
});


it('responds with a cookie when given valid credentials', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});








