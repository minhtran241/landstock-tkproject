'use strict';

/**
 * Fastify plugin for adding rate-limiting functionality.
 * @module RateLimitPlugin
 */

const fp = require('fastify-plugin');
const rateLimit = require('@fastify/rate-limit');

/**
 * Registers the rate-limiting plugin with the provided Fastify instance.
 * @function
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} opts - Options for the rate-limiting plugin.
 */
module.exports = fp(async function (fastify, opts) {
    /**
     * Configure rate-limiting with the specified options.
     */
    fastify.register(rateLimit, {
        max: 1000, // Maximum number of requests during the timeWindow
        timeWindow: '1 minute', // Time window for rate limiting
        cache: 10000, // Number of items to store in the cache
    });
});
