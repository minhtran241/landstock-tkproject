'use strict';
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
} = require('../../utilities/schemaGenerators');
const { po_PhuongXa } = require('../../../utilities/paramsOperations');

const getEntriesOpts = getSchemaGenerator(
    po_PhuongXa,
    's',
    'array',
    getAllEntries
);
const getEntryByIdOpts = getSchemaGenerator(
    po_PhuongXa,
    'i',
    'array',
    getEntryById
);
const postEntryOpts = postSchemaGenerator(po_PhuongXa, 'p', postEntry);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
