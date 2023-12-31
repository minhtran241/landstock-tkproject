'use strict';

// const { readFileSync } = require('node:fs');
// const path = require('node:path');
const fp = require('fastify-plugin');
const httpResponses = require('../../http/httpResponses');
const jwt = require('jsonwebtoken');

/**
 * Hook for JWT verification.
 * @param {object} fastify - The Fastify instance.
 * @param {object} opts - Options for the plugin.
 */
module.exports = fp(async function (fastify, opts) {
    /**
     * Global onRequest hook for JWT verification.
     * @param {object} request - The Fastify request object.
     * @param {object} reply - The Fastify reply object.
     */
    fastify.addHook('onRequest', async (request, reply) => {
        // Check if the request method and URL meet the specified conditions
        const isAuthorizedRoute =
            (request.method === 'GET' ||
                (request.method === 'POST' && request.url === '/kh')) &&
            request.url !== '/' &&
            !request.url.includes('/docs');

        if (isAuthorizedRoute) {
            const authorizationHeader = request.headers.authorization;

            if (
                !authorizationHeader ||
                !authorizationHeader.startsWith('Bearer ')
            ) {
                return reply
                    .code(httpResponses.UNAUTHORIZED.statusCode)
                    .send(httpResponses.UNAUTHORIZED);
            }

            const token = authorizationHeader.split(' ')[1];

            try {
                jwt.verify(token, process.env.JWT_SECRET, {
                    algorithms: 'HS256',
                    issuer: [
                        process.env.JWT_ISSUER,
                        process.env.JWT_ISSUER_LAN,
                    ],
                    audience: process.env.JWT_AUDIENCE,
                    subject: process.env.JWT_SUBJECT,
                });
            } catch (error) {
                console.error({
                    error: `${error.name}: ${error.message}`,
                    token,
                });
                reply
                    .code(httpResponses.UNAUTHORIZED.statusCode)
                    .send(httpResponses.UNAUTHORIZED);
            }
        }
    });

    // Register the @fastify/jwt plugin with the specified options
    // fastify.register(require('@fastify/jwt'), {
    //     secret: process.env.JWT_SECRET,
    //     verify: {
    //         algorithms: 'HS256', // Specify the allowed verification algorithms
    //         allowedIss: process.env.JWT_ISSUER, // Validate the issuer
    //         allowedAud: process.env.JWT_AUDIENCE, // Validate the audience
    //         allowedSub: process.env.JWT_SUBJECT, // Validate the subject
    //         ignoreExpiration: true, // Do not reject expired tokens
    //         cache: true, // Enable caching of the key lookup
    //     },
    // });

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
