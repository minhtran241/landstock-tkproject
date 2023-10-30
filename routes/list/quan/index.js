'use strict';
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

const getEntriesOpts = getSchemaGenerator(po_Quan, 's', 'array', getAllEntries);
const getEntryByIdOpts = getSchemaGenerator(
    po_Quan,
    'i',
    'object',
    getEntryById
);
const postEntryOpts = postSchemaGenerator(po_Quan, 'p', postEntry);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
