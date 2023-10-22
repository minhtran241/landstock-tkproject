'use strict';

const fp = require('fastify-plugin');
const helmet = require('@fastify/helmet');

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
    fastify.register(helmet, {
        // Basic configuration options:
        dnsPrefetchControl: false, // Disable DNS prefetching
        frameguard: {
            action: 'deny', // Prevent embedding in iframes
        },
        hidePoweredBy: { setTo: 'Fastify' }, // Change the X-Powered-By header
        hsts: { maxAge: 31536000, includeSubDomains: true }, // Enable HTTP Strict Transport Security
        ieNoOpen: true, // Force IE to load content in the best way possible
        noSniff: true, // Prevent browsers from interpreting files as something else
        xssFilter: true, // Enable the X-XSS-Protection header
    });
});
