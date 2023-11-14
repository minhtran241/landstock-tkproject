'use strict';

/**
 * Routes for handling operations related to customer entries (KhachHang).
 * @module KhachHangRoutes
 */

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../controllers/kh');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../utilities/routes/schemaGenerators');
const { po_KhachHang } = require('../../utilities/paramsOperations');

/**
 * Options for the route handling the retrieval of all customer entries.
 * @type {Object}
 */
const getEntriesOpts = getSchemaGenerator(
    po_KhachHang,
    's',
    'array',
    getAllEntries
);

/**
 * Options for the route handling the retrieval of a specific customer entry by ID.
 * @type {Object}
 */
const getEntryByIdOpts = getSchemaGenerator(
    po_KhachHang,
    'i',
    'object',
    getEntryById
);

/**
 * Options for the route handling the creation of a new customer entry.
 * @type {Object}
 */
const postEntryOpts = postSchemaGenerator(po_KhachHang, 'p', postEntry);

/**
 * Options for the route handling the deletion of a specific customer entry by ID.
 * @type {Object}
 */
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

/**
 * Registers routes for handling operations related to customer entries (KhachHang) with the provided Fastify instance.
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
