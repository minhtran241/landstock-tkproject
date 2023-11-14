'use strict';

/**
 * Routes for handling operations related to product types (LoaiHang).
 * @module LoaiHangRoutes
 */

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/loaihang');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../../utilities/routes/schemaGenerators');
const { po_LoaiHang } = require('../../../utilities/paramsOperations');

/**
 * Options for the route handling the retrieval of all product type entries.
 * @type {Object}
 */
const getEntriesOpts = getSchemaGenerator(
    po_LoaiHang,
    's',
    'array',
    getAllEntries
);

/**
 * Options for the route handling the retrieval of a specific product type entry by ID.
 * @type {Object}
 */
const getEntryByIdOpts = getSchemaGenerator(
    po_LoaiHang,
    'i',
    'object',
    getEntryById
);

/**
 * Options for the route handling the creation of a new product type entry.
 * @type {Object}
 */
const postEntryOpts = postSchemaGenerator(po_LoaiHang, 'p', postEntry);

/**
 * Options for the route handling the deletion of a specific product type entry by ID.
 * @type {Object}
 */
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

/**
 * Registers routes for handling operations related to product types (LoaiHang) with the provided Fastify instance.
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
