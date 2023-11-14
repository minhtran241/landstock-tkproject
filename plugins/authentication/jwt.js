'use strict';

const fp = require('fastify-plugin');
const httpResponses = require('../../http/httpResponses');

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/jwt'), {
        secret: process.env.JWT_SECRET,
        // sign: {
        //     // expiresIn: 0,
        //     algorithm: 'HS256', // Specify the signing algorithm (default is 'HS256')
        //     iss: process.env.JWT_ISSUER, // Specify the issuer of the JWT
        //     aud: process.env.JWT_AUDIENCE, // Specify the audience for the JWT
        // },
        verify: {
            algorithms: ['HS256'], // Specify the allowed verification algorithms
            allowedIss: process.env.JWT_ISSUER, // Validate the issuer
            allowedAud: process.env.JWT_AUDIENCE, // Validate the audience
            allowedSub: process.env.JWT_SUBJECT, // Validate the subject
            ignoreExpiration: true, // Do not reject expired tokens
            cache: true, // Enable caching of the key lookup
        },
    });

    // Define a global onRequest hook for JWT verification
    fastify.addHook('onRequest', async (request, reply) => {
        if (
            (request.method === 'GET' ||
                (request.method === 'POST' && request.url === '/kh')) &&
            request.url !== '/'
        ) {
            // Verify and decode the JWT
            try {
                await request.jwtVerify();
            } catch (err) {
                console.error(err);
                reply
                    .code(httpResponses.UNAUTHORIZED.statusCode)
                    .send(httpResponses.UNAUTHORIZED);
            }
        }
    });
});
