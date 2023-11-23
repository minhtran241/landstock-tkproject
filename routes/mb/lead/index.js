'use strict';

const { putLeadLand } = require('../../../controllers/mb/lead');

/**
 *
 * @module MB_LEAD_Routes
 */

/**
 * Route for testing MB lead post API.
 * @type {Object}
 */
const putLeadLandOpts = {
    schema: {
        tags: ['MB', 'lead'],
        description: 'Route for testing MB lead put API',
        summary: 'Route for testing MB lead put API',
        body: {
            type: 'object',
            properties: {
                code: {
                    type: 'string',
                },
                status: {
                    type: 'string',
                },
            },
        },
    },
    handler: putLeadLand,
};

/**
 *
 * @function
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} opts - Options for the route registration.
 */
module.exports = async function (fastify, opts) {
    fastify.put('/', putLeadLandOpts);
};
