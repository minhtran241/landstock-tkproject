'use strict';

/**
 * Routes for handling entries related to real estate (BDS).
 * @module BDSRoutes
 */

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../controllers/bds');

const { po_BDS } = require('../../utilities/paramsOperations');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../utilities/routes/schemaGenerators');

/**
 * Options for the route handling the retrieval of all entries.
 * @type {Object}
 */
const getEntriesOpts = getSchemaGenerator(po_BDS, 's', 'array', getAllEntries);

/**
 * Options for the route handling the retrieval of an entry by ID.
 * @type {Object}
 */
const getEntryByIdOpts = getSchemaGenerator(
    po_BDS,
    'i',
    'object',
    getEntryById
);

/**
 * Options for the route handling the creation of a new entry.
 * @type {Object}
 */
const postEntryOpts = postSchemaGenerator(po_BDS, 'p', postEntry);

/**
 * Options for the route handling the deletion of an entry by ID.
 * @type {Object}
 */
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

/**
 * Registers routes for handling entries related to real estate (BDS) with the provided Fastify instance.
 * @function
 * @param {Object} fastify - The Fastify instance.
 * @param {Object} opts - Options for the route registration.
 */
module.exports = async function (fastify, opts) {
    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
