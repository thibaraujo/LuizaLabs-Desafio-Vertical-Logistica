import request from 'supertest';
import app from '../app';
import path from 'path';
import { OrderModel } from '../models/order';
import { isValidOrder } from '../utils/orderService';

const orderStructure: {
    user_id: Number,
    name: String,
    orders: [
        {
            order_id: Number,
            date: String,
            total: String,
            products: [
                {
                    product_id: Number,
                    value: String,
                },
            ],
        },
    ]
} = {
    user_id: 0,
    name: '',
    orders: [
        {
            order_id: 0,
            date: '',
            total: '0',
            products: [
                {
                    product_id: 0,
                    value: '0',
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

    test('should fail to upload a file and create orders - file type wrong', async () => {
        const filePath = path.resolve(process.cwd(), 'challengeDescription/failTest.pdf');

        const response = await request(app)
            .post('/api/orders/files')
            .attach('file', filePath);
        expect(response.status).toBe(400);
    });

    test('should fail to upload a file and create orders - without file', async () => {
        const response = await request(app)
            .post('/api/orders/files');
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

// Testes sets do schema Order
describe('Order Schema', () => {
    test('should create a new order with correct setters', async () => {
        const order = new OrderModel({
            user_id: 1,
            order_id: 1,
            date: "20210101",
            name: 'Test',
            product: {
                product_id: 1,
                value: 1,
            },
        });

        expect(order).toHaveProperty('user_id', 1);
        expect(order).toHaveProperty('order_id', 1);
        expect(order).toHaveProperty('date');
        expect(order).toHaveProperty('name', 'Test');
        expect(order).toHaveProperty('product');
    });

    test('should create a new order with correct setters string to number', async () => {
        const order = new OrderModel({
            user_id: "1",
            order_id: "1",
            date: "20210101",
            name: 'Test',
            product: {
                product_id: "1",
                value: "1",
            },
        });

        expect(order).toHaveProperty('user_id', 1);
        expect(order).toHaveProperty('order_id', 1);
        expect(order).toHaveProperty('date');
        expect(order).toHaveProperty('name', 'Test');
        expect(order).toHaveProperty('product');
    });
});

// Testes Error Handlers
describe('Error Handlers', () => {
    test('should return 404 error', async () => {
        const response = await request(app).get('/api/invalid');
        expect(response.status).toBe(404);
    });
});

// Testes unitários em OrderService
describe('isValidOrder', () => {
    const validOrder = {
        user_id: '123',
        name: 'John Doe',
        order_id: 'order_001',
        product: {
            product_id: '1',
            value: '100',
        },
        date: '2025-01-01',
    };

    it('should return true for a valid order', () => {
        expect(isValidOrder(validOrder)).toBe(true);
    });

    it('should return false if a required field is missing', () => {
        const invalidOrder = { ...validOrder } as any;
        delete invalidOrder.name;
        expect(isValidOrder(invalidOrder)).toBe(false);
    });

    it('should return false if a required field is empty string', () => {
        const invalidOrder = { ...validOrder, name: '' };
        expect(isValidOrder(invalidOrder)).toBe(false);
    });

    it('should return false if a required field is null', () => {
        const invalidOrder = { ...validOrder, name: null };
        expect(isValidOrder(invalidOrder)).toBe(false);
    });

    it('should return false if a required field is undefined', () => {
        const invalidOrder = { ...validOrder, name: undefined };
        expect(isValidOrder(invalidOrder)).toBe(false);
    });

    it('should return false if a numeric field is NaN', () => {
        const invalidOrder = { ...validOrder, user_id: NaN };
        expect(isValidOrder(invalidOrder)).toBe(false);
    });

    it('should return false if a required string field contains only spaces', () => {
        const invalidOrder = { ...validOrder, name: '   ' };
        expect(isValidOrder(invalidOrder)).toBe(false);
    });
});

afterAll(async () => {
    await OrderModel.deleteMany({});
});