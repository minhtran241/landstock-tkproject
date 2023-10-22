'use strict';

const fp = require('fastify-plugin');

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/swagger'), {});
    fastify.register(require('@fastify/swagger-ui'), {
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'Landstock-TKProject API Documentation',
                description: 'Landstock-TKProject API Documentation',
                version: '0.1.0',
                termsOfService:
                    'https://github.com/minhtran241/landstock-tkproject/tree/main',
                contact: {
                    name: 'Minh Tran',
                    url: 'https://minhtran.netlify.app',
                    email: 'minhthevenus@gmail.com',
                },
            },
            externalDocs: {
                url: 'https://github.com/minhtran241/landstock-tkproject/tree/main',
                description: 'Find more info here',
            },
            host: 'https://b.thienkhoi.com',
            basePath: '',
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                {
                    name: 'User',
                    description: "User's API",
                },
            ],
            definitions: {
                User: {
                    type: 'object',
                    required: ['id', 'email'],
                    properties: {
                        id: {
                            type: 'number',
                            format: 'uuid',
                        },
                        firstName: {
                            type: 'string',
                        },
                        lastName: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                        },
                    },
                },
            },
        },
        uiConfig: {
            docExpansion: 'full', // expand/not all the documentations none|list|full
            deepLinking: true,
        },
        uiHooks: {
            onRequest: function (request, reply, next) {
                next();
            },
            preHandler: function (request, reply, next) {
                next();
            },
        },
        staticCSP: false,
        transformStaticCSP: (header) => header,
        exposeRoute: true,
    });
});
