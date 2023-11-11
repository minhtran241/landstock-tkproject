'use strict';

module.exports = async function (fastify, opts) {
    // health check
    fastify.get('/', async function (request, reply) {
        // Perform health check logic here
        const isHealthy = true; // Replace with your actual health check logic

        if (isHealthy) {
            return reply.code(200).send({
                statusCode: 200,
                status: 'ok',
            });
        } else {
            return reply.code(500).send({
                statusCode: 500,
                status: 'error',
            });
        }
    });
};
