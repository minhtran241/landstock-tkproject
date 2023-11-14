'use strict';

/**
 * Fastify plugin for adding utilities to handle HTTP errors.
 * @module HttpErrorsPlugin
 */

const fp = require('fastify-plugin');

/**
 * Registers the `fastify-sensible` plugin with the provided Fastify instance.
 * @function
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} opts - Options for the `fastify-sensible` plugin.
 */
module.exports = fp(async function (fastify, opts) {
    /**
     * Register the `fastify-sensible` plugin with error handling disabled.
     */
    fastify.register(require('@fastify/sensible'), {
        errorHandler: false,
    });
});
