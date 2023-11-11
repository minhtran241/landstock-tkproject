'use strict';

const fp = require('fastify-plugin');
const cors = require('@fastify/cors');

module.exports = fp(async function (fastify, opts) {
    fastify.register(cors, {
        origin: [
            `http://localhost:${process.env.FASTIFY_PORT}`,
            `http://${process.env.FASTIFY_ADDRESS}:${process.env.FASTIFY_PORT}`,
            'http://localhost:3000',
        ],
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });
});
