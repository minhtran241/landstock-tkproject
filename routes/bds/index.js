'use strict';
const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../controllers/bds');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../utilities/schemaGenerators');
const { po_BDS } = require('../../utilities/paramsOperations');

// const getEntriesOpts = getSchemaGenerator(po_BDS, 's', 'array', getAllEntries);
const getEntryByIdOpts = getSchemaGenerator(
    po_BDS,
    'i',
    'object',
    getEntryById
);
const postEntryOpts = postSchemaGenerator(po_BDS, 'p', postEntry);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    fastify.get('/', opt, getAllEntries);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
