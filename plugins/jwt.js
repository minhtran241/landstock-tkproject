'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/jwt'), {
        secret: process.env.JWT_SECRET,
        sign: {
            // expiresIn: 0,
            algorithm: 'HS256', // Specify the signing algorithm (default is 'HS256')
            issuer: process.env.JWT_ISSUER, // Specify the issuer of the JWT
            audience: process.env.JWT_AUDIENCE, // Specify the audience for the JWT
        },
        verify: {
            // maxAge: null,
            algorithms: ['HS256'], // Specify the allowed verification algorithms
            issuer: process.env.JWT_ISSUER, // Validate the issuer
            audience: process.env.JWT_AUDIENCE, // Validate the audience
        },
        cookie: {
            // Add cookies for storing JWT tokens
            options: {
                path: '/',
                httpOnly: true,
                secure: true, // Set to true for HTTPS
                sameSite: 'strict', // Adjust as needed
            },
        },
        decode: {
            complete: true, // Decode the complete token (header, payload, and signature)
        },
        messages: {
            // Customize error messages if needed
            tokenExpired:
                'Your session has expired. Please provide a new token.',
            noAuthorization: 'You are not authorized to access this resource.',
            secretOrPrivateKeyMissing:
                'Internal server error. Please try again later.',
        },
    });

    // Define a custom decorator for JWT verification
    fastify.decorate('verifyJWT', async function (request, reply) {
        try {
            // Verify and decode the JWT
            const { sub, name, iat } = await request.jwtVerify();
            if (
                sub !== process.env.JWT_SUBJECT ||
                name !== process.env.JWT_NAME
            ) {
                console.error('Invalid JWT subject or name:', {
                    sub,
                    name,
                    iat,
                });
                throw new Error('Invalid token');
            }
        } catch (err) {
            reply.send(err);
        }
    });

    // Define a global onRequest hook for JWT verification
    fastify.addHook('onRequest', async (request, reply) => {
        if (request.method === 'GET' && request.url !== '/health') {
            // Verify and decode the JWT
            const { sub, name, iat } = await request.jwtVerify();
            if (
                sub !== process.env.JWT_SUBJECT ||
                name !== process.env.JWT_NAME
            ) {
                console.error('Invalid JWT subject or name:', {
                    sub,
                    name,
                    iat,
                });
                throw new Error('Invalid token');
            }
        }
    });
});
