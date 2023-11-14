'use strict';

/**
 * Routes for handling functional queries related to real estate (BDS).
 * @module BDSFunctionalRoutes
 */

const { getFuncValue } = require('../../../controllers/bds');
const {
    getFuncSchemaGenerator,
} = require('../../../utilities/routes/schemaGenerators');

/**
 * Options for the route handling functional queries.
 * @type {Object}
 */
const getFuncOpts = getFuncSchemaGenerator(getFuncValue);

/**
 * Registers a route for handling functional queries related to real estate (BDS) with the provided Fastify instance.
 * @function
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} opts - Options for the route registration.
 */
module.exports = async function (fastify, opts) {
    fastify.get('/', getFuncOpts);
};
