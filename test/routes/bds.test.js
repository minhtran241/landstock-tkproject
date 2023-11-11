const { test } = require('tap');
const Fastify = require('fastify');
const app = require('../../routes/bds');

let fastify;
let bearerToken = process.env.TEST_TOKEN; // Assuming you have a valid bearer token

test('setup', async (t) => {
    fastify = Fastify();
    await fastify.register(app);
    await fastify.ready();
    t.end();
});

test('POST / should create a new entry', async (t) => {
    const newEntry = {
        sMa: 'ABC123',
        sNoiDung: 'Some content',
        // ... other required fields
    };

    const response = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: newEntry,
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    });

    t.equal(response.statusCode, 201);
    t.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8'
    );

    const createdEntry = JSON.parse(response.payload);
    // Add more assertions based on your specific response format and expectations
    t.end();
});

test('GET / should return an array of entries', async (t) => {
    const response = await fastify.inject({
        method: 'GET',
        url: '/',
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    });

    t.equal(response.statusCode, 200);
    t.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8'
    );

    const entries = JSON.parse(response.payload);
    // Add more assertions based on your specific response format and expectations
    t.end();
});

// Similar modifications for other test cases...

test('teardown', (t) => {
    fastify.close();
    t.end();
});
