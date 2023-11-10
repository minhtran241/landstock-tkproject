'use strict';

const fp = require('fastify-plugin');

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
    // Set the log level based on the environment
    const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

    fastify.register(require('@fastify/sensible'), {
        errorHandler: false,
        logger: {
            level: logLevel,
            prettyPrint: process.env.NODE_ENV !== 'production',
        },
    });
});
