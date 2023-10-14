'use strict';

const path = require('path');
const AutoLoad = require('@fastify/autoload');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function (fastify, opts) {
    // This loads cors plugin
    fastify.register(require('@fastify/cors'), {
        origin: [
            'http://localhost:8080',
            'http://127.0.0.1:8080',
            'http://localhost:3000',
        ],
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });

    // This loads healthcheck plugin for the server
    fastify.register(require('fastify-healthcheck'));

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts),
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts),
    });
};
