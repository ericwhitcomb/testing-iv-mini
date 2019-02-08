const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

describe('the route handlers', () => {
    
    describe('get /', () => {

        test('responds with 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const response = await request(server).get('/');

            expect(response.type).toMatch(/json/i);
        });

        test('sends correct response object', async () => {
            const response = await request(server).get('/');

            expect(response.body).toEqual({api: 'up'});
        });

    });
    
    describe('get /hobbits', () => {

        test('responds with 200', async () => {
            const response = await request(server).get('/hobbits');

            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const response = await request(server).get('/hobbits');

            expect(response.type).toMatch(/json/i);
        });

        test('sends correct response object', async () => {
            const response = await request(server).get('/hobbits');

            expect(response.body).toEqual([]);
        });

    });

    describe('post /hobbits', () => {

        afterEach(async () => {
            await db('hobbits').truncate();
        });

        test('responds with 201', async () => {
            const body = { name: 'Bilbo' };
            const response = await request(server).post('/hobbits').send(body);

            expect(response.status).toBe(201);
        });

        test('returns array with single id', async () => {
            const body = { name: 'Bilbo' };
            const response = await request(server).post('/hobbits').send(body);

            expect(response.body.length).toBe(1);
        });

        test('responds with 400', async () => {
            const body = { };
            const response = await request(server).post('/hobbits').send(body);

            expect(response.status).toBe(400);
        });

    });

});