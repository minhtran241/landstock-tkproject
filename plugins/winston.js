'use strict';

const fp = require('fastify-plugin');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

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
            new DailyRotateFile({
                filename: '/root/landstock-dev/logs/info-%DATE%.log',
                level: 'info', // Log info messages to info-<DATE>.log
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m', // optional: rotate log files after 20 megabytes
                maxFiles: '14d', // optional: keep logs for 14 days
            }),
            new DailyRotateFile({
                filename: '/root/landstock-dev/logs/error-%DATE%.log',
                level: 'error', // Log error messages to error-<DATE>.log
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
            }),
        ],
    });

    // Set the Fastify logger to the configured Winston logger
    fastify.log = logger;

    // Log every incoming request with additional details
    fastify.addHook('onRequest', (request, reply, done) => {
        // Log successful requests
        if (request.statusCode < 400) {
            const requestInfo = {
                method: request.method,
                url: request.url,
                ip: request.ip,
                userAgent: request.headers['user-agent'],
                params: request.params,
                query: request.query,
                body: request.body,
                headers: request.headers,
            };

            fastify.log.info({ request: requestInfo });
            done();
        }
    });

    // Log errors
    fastify.addHook('onError', (request, reply, error, done) => {
        const errorInfo = {
            method: request.method,
            url: request.url,
            ip: request.ip,
            userAgent: request.headers['user-agent'],
            params: request.params,
            query: request.query,
            body: request.body,
            headers: request.headers,
            error: {
                message: error.message,
                stack: error.stack,
            },
        };

        fastify.log.error({ error: errorInfo });
        done();
    });
});
