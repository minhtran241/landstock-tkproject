'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/jwt'), {
        secret: process.env.JWT_SECRET,
    });

    // Define a custom decorator for JWT verification
    fastify.decorate('verifyJWT', async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });

    // Define a global onRequest hook for JWT verification
    fastify.addHook('onRequest', async (request, reply) => {
        if (request.method === 'GET') {
            fastify.verifyJWT(request, reply);
        }
    });
});
