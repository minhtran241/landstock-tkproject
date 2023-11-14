'use strict';

/**
 * Routes for handling operations related to districts (Quan).
 * @module QuanRoutes
 */

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/quan');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../../utilities/routes/schemaGenerators');
const { po_Quan } = require('../../../utilities/paramsOperations');

/**
 * Options for the route handling the retrieval of all district entries.
 * @type {Object}
 */
const getEntriesOpts = getSchemaGenerator(po_Quan, 's', 'array', getAllEntries);

/**
 * Options for the route handling the retrieval of a specific district entry by ID.
 * @type {Object}
 */
const getEntryByIdOpts = getSchemaGenerator(
    po_Quan,
    'i',
    'object',
    getEntryById
);

/**
 * Options for the route handling the creation of a new district entry.
 * @type {Object}
 */
const postEntryOpts = postSchemaGenerator(po_Quan, 'p', postEntry);

/**
 * Options for the route handling the deletion of a specific district entry by ID.
 * @type {Object}
 */
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

/**
 * Registers routes for handling operations related to districts (Quan) with the provided Fastify instance.
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
