const request = require('supertest');
const app = require('./app');

describe('GET / Endpoint Validation (Negative Test Demonstration)', () => {
    it('should deliberately fail asserting an incorrect HTTP status code', async () => {
        const response = await request(app).get('/');
        // The server returns 200, so expecting 500 will intentionally trigger failure
        expect(response.statusCode).toBe(500);
    });
});
