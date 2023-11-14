'use strict';

/**
 * Routes for handling operations related to provinces (Tinh).
 * @module TinhRoutes
 */

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/tinh');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../../utilities/routes/schemaGenerators');
const { po_Tinh } = require('../../../utilities/paramsOperations');

/**
 * Options for the route handling the retrieval of all province entries.
 * @type {Object}
 */
const getEntriesOpts = getSchemaGenerator(po_Tinh, 's', 'array', getAllEntries);

/**
 * Options for the route handling the retrieval of a specific province entry by ID.
 * @type {Object}
 */
const getEntryByIdOpts = getSchemaGenerator(
    po_Tinh,
    'i',
    'object',
    getEntryById
);

/**
 * Options for the route handling the creation of a new province entry.
 * @type {Object}
 */
const postEntryOpts = postSchemaGenerator(po_Tinh, 'p', postEntry);

/**
 * Options for the route handling the deletion of a specific province entry by ID.
 * @type {Object}
 */
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

/**
 * Registers routes for handling operations related to provinces (Tinh) with the provided Fastify instance.
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
