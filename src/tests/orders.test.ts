import request from 'supertest';
import app from '../app';
import path from 'path';
import { OrderModel } from '../models/order';

const orderStructure: {
    user_id: String,
    name: String,
    orders: [
        {
            order_id: String,
            date: String,
            total: Number,
            products: [
                {
                    product_id: String,
                    value: Number,
                },
            ],
        },
    ]
} = {
    user_id: '',
    name: '',
    orders: [
        {
            order_id: '',
            date: '',
            total: 0,
            products: [
                {
                    product_id: '',
                    value: 0,
                },
            ],
        },
    ],
}

// Teste para a rota POST /orders/files
describe('POST /orders/files', () => {
    test('should upload a file and create orders', async () => {
        const filePath = path.resolve(process.cwd(), 'challengeDescription/successTest.txt');

        const response = await request(app)
            .post('/api/orders/files')
            .attach('file', filePath);
        expect(response.status).toBe(201);
    });

    test('should fail to upload a file and create orders', async () => {
        const filePath = path.resolve(process.cwd(), 'challengeDescription/failTest.pdf');

        const response = await request(app)
            .post('/api/orders/files')
            .attach('file', filePath);
        expect(response.status).toBe(400);
    });
});

// Teste para a rota GET /orders
describe('GET /orders', () => {
    test('should return a list of orders', async () => {
        const response = await request(app).get('/api/orders');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        const keys = Object.keys(orderStructure);

        if (response.body.length > 0) {
            for (const key of keys) {
                expect(response.body[0]).toHaveProperty(key);
            }
        }
    });

    test('should return a list of orders with order_id query', async () => {
        const response = await request(app).get('/api/orders').query({ order_id: 1227 });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        const keys = Object.keys(orderStructure);

        if (response.body.length > 0) {
            for (const key of keys) {
                expect(response.body[0]).toHaveProperty(key);
            }
        }
    });

    test('should return a list of orders with startData and endDate query', async () => {
        const response = await request(app).get('/api/orders').query({ startDate: '2021-01-01', endDate: '2021-12-02' });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        const keys = Object.keys(orderStructure);

        if (response.body.length > 0) {
            for (const key of keys) {
                expect(response.body[0]).toHaveProperty(key);
            }
        }
    });

    test('should return fail to return a list of orders with invalid query', async () => {
        const response = await request(app).get('/api/orders').query({ order_id: 'invalid' });
        expect(response.status).toBe(400);
    });
});

afterAll(async () => {
    await OrderModel.deleteMany({});
});