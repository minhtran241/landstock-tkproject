'use strict';

/**
 * Routes for handling operations related to house directions (HuongNha).
 * @module HuongNhaRoutes
 */

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/huongnha');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../../utilities/routes/schemaGenerators');
const { po_HuongNha } = require('../../../utilities/paramsOperations');

/**
 * Options for the route handling the retrieval of all house direction entries.
 * @type {Object}
 */
const getEntriesOpts = getSchemaGenerator(
    po_HuongNha,
    's',
    'array',
    getAllEntries
);

/**
 * Options for the route handling the retrieval of a specific house direction entry by ID.
 * @type {Object}
 */
const getEntryByIdOpts = getSchemaGenerator(
    po_HuongNha,
    'i',
    'object',
    getEntryById
);

/**
 * Options for the route handling the creation of a new house direction entry.
 * @type {Object}
 */
const postEntryOpts = postSchemaGenerator(po_HuongNha, 'p', postEntry);

/**
 * Options for the route handling the deletion of a specific house direction entry by ID.
 * @type {Object}
 */
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

/**
 * Registers routes for handling operations related to house directions (HuongNha) with the provided Fastify instance.
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
