const request = require('supertest');
const app = require('./app');

describe('GET / Endpoint Validation', () => {
    it('should respond with status code 200', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    it('should return "Hello World!" payload text', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello World!');
    });
});
