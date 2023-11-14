'use strict';

/**
 * Fastify plugin for enabling Cross-Origin Resource Sharing (CORS).
 * @module CorsPlugin
 */

const fp = require('fastify-plugin');
const cors = require('@fastify/cors');

/**
 * Registers the CORS plugin with the provided Fastify instance.
 * @function
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} opts - Options for the CORS plugin.
 */
module.exports = fp(async function (fastify, opts) {
    /**
     * Configure CORS with specified origins and methods.
     */
    fastify.register(cors, {
        origin: [
            `http://localhost:${process.env.FASTIFY_PORT}`,
            `http://${process.env.FASTIFY_ADDRESS}:${process.env.FASTIFY_PORT}`,
            'http://localhost:3000',
        ],
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });
});
