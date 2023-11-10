'use strict';

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

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: process.env.FASTIFY_PORT || 3000 });
        fastify.log.info(
            `Server listening on ${fastify.server.address().port}`
        );
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
