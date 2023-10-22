'use strict';
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
} = require('../../utilities/schemaGenerators');
const { po_HuongNha } = require('../../../utilities/paramsOperations');

const getEntriesOpts = getSchemaGenerator(
    po_HuongNha,
    's',
    'array',
    getAllEntries
);
const getEntryByIdOpts = getSchemaGenerator(
    po_HuongNha,
    'i',
    'array',
    getEntryById
);
const postEntryOpts = postSchemaGenerator(po_HuongNha, 'p', postEntry);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
