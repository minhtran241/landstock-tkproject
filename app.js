'use strict';

require('dotenv').config();
const path = require('path');
const AutoLoad = require('@fastify/autoload');

// Pass --options via CLI arguments in command to enable these options.
const options = {
    logger: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
};

// Create a Fastify instance
const fastify = require('fastify')(options);

// Register the healthcheck plugin
fastify.register(require('fastify-healthcheck'));

// Load plugins defined in plugins directory
fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, options),
});

// Load routes defined in routes directory
fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, options),
});

// This loads cors plugin
fastify.register(require('@fastify/cors'), {
    origin: [
        `http://localhost:${process.env.FASTIFY_PORT}`,
        `http://${process.env.FASTIFY_ADDRESS}:${process.env.FASTIFY_PORT}`,
        'http://localhost:3000',
    ],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({
            host: process.env.FASTIFY_ADDRESS || '127.0.0.1',
            port: process.env.FASTIFY_PORT || 3000,
        });
        fastify.log.info(
            `Server listening on ${fastify.server.address().port}`
        );
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
