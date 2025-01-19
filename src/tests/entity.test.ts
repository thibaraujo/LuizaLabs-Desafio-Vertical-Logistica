// import request from 'supertest';
// import app from '../app';
// import database from '../services/database';

// let createdObj: any;

// const objStructure: {
//   atribute: string;
// } = {
//   atribute: 'Test',
// };

// describe('#1 Create an object', () => {
//   test('should create a simple object successfully in the database', async () => {
//     const object: {
//       atribute: string;
//     } = {
//       atribute: 'Obj de Teste',
//     };
//     const response = await request(app).post('/api/entity').send(object);
//     expect(response.status).toBe(200);

//     for (const key in object) {
//       expect(response.body).toHaveProperty(key);
//     }
//   });
// });

// describe('#3 Update an object', () => {
//   test('should update object information successfully in the database', async () => {

//     const updatedObject: {
//       atribute: string;
//     } = {
//       atribute: 'Updated Test',
//     };
//     const response = await request(app).put('/api/entity').query({ id: createdObj._id }).send(updatedObject);
//     expect(response.status).toBe(200);

//     for (const key in updatedObject) {
//       expect(response.body).toHaveProperty(key);
//     }
//   });
// });

// describe('#5 Delete an object', () => {
//   test('should delete object information successfully in the database', async () => {
//     const response = await request(app).delete('/api/entity').query({ id: createdObj._id }).send('ok');
//     expect(response.status).toBe(200);
//   });
// });

// describe('#6 Activate an object', () => {
//   test('should activate object information successfully in the database', async () => {
//     const response = await request(app).put('/api/entity/activate').query({ id: createdObj._id }).send('ok');
//     expect(response.status).toBe(200);
//   });
// });

// describe('#7 List Objects', () => {
//   test('should list all objects information successfully in the database', async () => {
//     const response = await request(app).get('/api/entity').send('Ok');
//     expect(response.status).toBe(200);

//     const keys = Object.keys(objStructure);
//     for (const key of keys) {
//       expect(response.body.results[0]).toHaveProperty(key);
//     }

//   });
// });

// describe('#8 List Especific Object', () => {
//   test('should list an object based on his ID information successfully in the database', async () => {
//     const response = await request(app).get('/api/entity').query({ id: createdObj._id }).send('Ok');
//     console.log(response.body);
//     expect(response.status).toBe(200);

//     for (const key in objStructure) {
//       expect(response.body).toHaveProperty(key);
//     }
//   });
// });

// afterAll(async () => {
//   try {
//     await database.disconnect();
//   } catch (err) {
//     console.error(err);
//   }
// });