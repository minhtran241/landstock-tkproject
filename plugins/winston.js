'use strict';

const fp = require('fastify-plugin');
const winston = require('winston');

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
    // Set the log level based on the environment
    const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

    // Configure Winston for custom logging
    const logger = winston.createLogger({
        level: logLevel,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console(), // Log to console for both levels
            new winston.transports.File({
                filename: '/root/info.log',
                level: 'info', // Log info messages to info.log
            }),
            new winston.transports.File({
                filename: '/root/error.log',
                level: 'error', // Log error messages to error.log
            }),
        ],
    });

    // Set the Fastify logger to the configured Winston logger
    fastify.log = logger;
});
