const hobbits = require('./hobbitsModel');
const db = require('../data/dbConfig');

describe('the hobbit model', () => {

    afterEach(async () => {
        await db('hobbits').truncate();
    });

    test('should insert new hobbits', async () => {
        const ids = await hobbits.insert({name: 'Bilbo'});

        expect(ids.length).toBe(1);
        expect(ids[0]).toBe(1);
    });

});