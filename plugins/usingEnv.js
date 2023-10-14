'use strict';

const fp = require('fastify-plugin');
const fastifyEnv = require('@fastify/env');

const schema = {
    type: 'object',
    required: ['FASTIFY_PORT', 'FASTIFY_ADDRESS'],
    properties: {
        FASTIFY_PORT: {
            type: 'string',
            default: 8080,
        },
        FASTIFY_ADDRESS: {
            type: 'string',
            default: '127.0.0.1',
        },
    },
};
const options = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    data: process.env,
};

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
    fastify.register(fastifyEnv, options);
    await fastify.after();
    // This loads cors plugin
    fastify.register(require('@fastify/cors'), {
        origin: [
            `http://localhost:${fastify.config.FASTIFY_PORT}`,
            `http://${fastify.config.FASTIFY_ADDRESS}:${fastify.config.FASTIFY_PORT}`,
            'http://localhost:3000',
        ],
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });
});
