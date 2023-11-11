'use strict';

const fp = require('fastify-plugin');
const rateLimit = require('@fastify/rate-limit');

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
    fastify.register(rateLimit, {
        max: 1000,
        timeWindow: '1 minute',
        cache: 10000, // Number of items to store in the cache
    });
});
