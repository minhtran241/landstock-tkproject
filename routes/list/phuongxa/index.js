'use strict';

/**
 * Routes for handling operations related to urban wards (PhuongXa).
 * @module PhuongXaRoutes
 */

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/phuongxa');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../../utilities/routes/schemaGenerators');
const { po_PhuongXa } = require('../../../utilities/paramsOperations');

/**
 * Options for the route handling the retrieval of all urban ward entries.
 * @type {Object}
 */
const getEntriesOpts = getSchemaGenerator(
    po_PhuongXa,
    's',
    'array',
    getAllEntries
);

/**
 * Options for the route handling the retrieval of a specific urban ward entry by ID.
 * @type {Object}
 */
const getEntryByIdOpts = getSchemaGenerator(
    po_PhuongXa,
    'i',
    'object',
    getEntryById
);

/**
 * Options for the route handling the creation of a new urban ward entry.
 * @type {Object}
 */
const postEntryOpts = postSchemaGenerator(po_PhuongXa, 'p', postEntry);

/**
 * Options for the route handling the deletion of a specific urban ward entry by ID.
 * @type {Object}
 */
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

/**
 * Registers routes for handling operations related to urban wards (PhuongXa) with the provided Fastify instance.
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
