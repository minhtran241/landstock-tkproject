const { test } = require('tap');
const Fastify = require('fastify');
const app = require('../../routes/bds');

let fastify;

test('setup', async (t) => {
    fastify = Fastify();
    await fastify.register(app);
    await fastify.ready();
    t.end();
});

// test('POST / should create a new entry', async (t) => {
//     const newEntry = {
//         sMa: 'ABC123',
//         sNoiDung: 'Some content',
//         // ... other required fields
//     };

//     const response = await fastify.inject({
//         method: 'POST',
//         url: '/',
//         payload: newEntry,
//     });

//     t.equal(response.statusCode, 201);
//     t.equal(
//         response.headers['content-type'],
//         'application/json; charset=utf-8'
//     );

//     const createdEntry = JSON.parse(response.payload);
//     // Add more assertions based on your specific response format and expectations
//     t.end();
// });

test('GET / should return an array of entries', async (t) => {
    const response = await fastify.inject({
        method: 'GET',
        url: '/',
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

test('GET /:id should return a single entry by ID', async (t) => {
    // Assume 'some_id' is a valid ID for testing
    const entryIdToRetrieve = 'some_id';

    const response = await fastify.inject({
        method: 'GET',
        url: `/${entryIdToRetrieve}`,
    });

    t.equal(response.statusCode, 200);
    t.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8'
    );

    const retrievedEntry = JSON.parse(response.payload);
    // Add more assertions based on your specific response format and expectations
    t.end();
});

test('DELETE /:id should delete an entry by ID', async (t) => {
    // Assume 'some_id' is a valid ID for testing
    const entryIdToDelete = 'some_id';

    const response = await fastify.inject({
        method: 'DELETE',
        url: `/${entryIdToDelete}`,
    });

    t.equal(response.statusCode, 200);
    t.equal(
        response.headers['content-type'],
        'application/json; charset=utf-8'
    );

    const deletedEntry = JSON.parse(response.payload);
    // Add more assertions based on your specific response format and expectations
    t.end();
});

test('teardown', (t) => {
    fastify.close();
    t.end();
});
