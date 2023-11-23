'use strict';

// const { readFileSync } = require('node:fs');
// const path = require('node:path');
const fp = require('fastify-plugin');
const httpResponses = require('../../http/httpResponses');
const jwt = require('jsonwebtoken');

/**
 * Fastify plugin for JWT authentication.
 * @param {object} fastify - The Fastify instance.
 * @param {object} opts - Options for the plugin.
 */
module.exports = fp(async function (fastify, opts) {
    // Register the @fastify/jwt plugin with the specified options
    fastify.register(require('@fastify/jwt'), {
        secret: process.env.JWT_SECRET,
        verify: {
            algorithms: 'HS256', // Specify the allowed verification algorithms
            allowedIss: process.env.JWT_ISSUER, // Validate the issuer
            allowedAud: process.env.JWT_AUDIENCE, // Validate the audience
            allowedSub: process.env.JWT_SUBJECT, // Validate the subject
            ignoreExpiration: true, // Do not reject expired tokens
            cache: true, // Enable caching of the key lookup
        },
    });

    /**
     * Register the @fastify/jwt plugin with the specified options (for MB to sign JWTs)
     */
    // fastify.register(require('@fastify/jwt'), {
    //     secret: {
    //         // .pem file path
    //         private: readFileSync(
    //             `${path.join(__dirname, 'certs')}/private.pem`,
    //             'utf8'
    //         ),
    //         public: '',
    //     },
    //     sign: {
    //         algorithm: 'RS256',
    //     },
    //     verify: false,
    // });

    fastify.addHook('onRequest', async (request, reply) => {
        if (
            (request.method === 'GET' ||
                (request.method === 'POST' && request.url === '/kh')) &&
            request.url !== '/' &&
            !request.url.includes('/docs')
        ) {
            const token = request.headers.authorization.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                    algorithms: 'HS256',
                    issuer: process.env.JWT_ISSUER,
                    audience: process.env.JWT_AUDIENCE,
                    subject: process.env.JWT_SUBJECT,
                });
                console.log(decoded);
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    console.error('JWT has expired:', error.message);
                } else {
                    console.error('JWT verification failed:', error.message);
                }
                reply
                    .code(httpResponses.UNAUTHORIZED.statusCode)
                    .send(httpResponses.UNAUTHORIZED);
            }
        }
    });

    /**
     * Global onRequest hook for JWT verification.
     * @param {object} request - The Fastify request object.
     * @param {object} reply - The Fastify reply object.
     */
    // fastify.addHook('onRequest', async (request, reply) => {
    //     // Check if the request method and URL meet the specified conditions:
    //     // 1. The request method is GET || POST of kh
    //     // 2. The request URL is not '/' (health check) or '/docs' (Swagger UI docs)
    //     if (
    //         (request.method === 'GET' ||
    //             (request.method === 'POST' && request.url === '/kh')) &&
    //         request.url !== '/' &&
    //         !request.url.includes('/docs')
    //     ) {
    //         try {
    //             // Verify and decode the JWT
    //             await request.jwtVerify();
    //         } catch (err) {
    //             console.error(err);
    //             // Send an unauthorized response if verification fails
    //             reply
    //                 .code(httpResponses.UNAUTHORIZED.statusCode)
    //                 .send(httpResponses.UNAUTHORIZED);
    //         }
    //     }
    // });
});
