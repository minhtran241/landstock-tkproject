'use strict';

const { postToLead } = require('../../../controllers/mb/lead');

/**
 *
 * @module MB_LEAD_Routes
 */

/**
 * Route for testing MB lead post API.
 * @type {Object}
 */
const postToLeadOpts = {
    // schema:
    handler: postToLead,
};

/**
 *
 * @function
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} opts - Options for the route registration.
 */
module.exports = async function (fastify, opts) {
    fastify.post('/', postToLeadOpts);
};
