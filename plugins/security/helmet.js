'use strict';

/**
 * Fastify plugin for adding security headers using Helmet.
 * @module HelmetPlugin
 */

const fp = require('fastify-plugin');
const helmet = require('@fastify/helmet');

/**
 * Registers the Helmet plugin with the provided Fastify instance.
 * @function
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} opts - Options for the Helmet plugin.
 */
module.exports = fp(async function (fastify, opts) {
    /**
     * Configure Helmet with security header options.
     */
    fastify.register(helmet, {
        // Basic configuration options:
        dnsPrefetchControl: false, // Disable DNS prefetching
        frameguard: {
            action: 'deny', // Prevent embedding in iframes
        },
        hsts: { maxAge: 31536000, includeSubDomains: true }, // Enable HTTP Strict Transport Security
        ieNoOpen: true, // Force IE to load content in the best way possible
        noSniff: true, // Prevent browsers from interpreting files as something else
        xssFilter: true, // Enable the X-XSS-Protection header
    });
});
