'use strict';
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

const getEntriesOpts = getSchemaGenerator(po_Tinh, 's', 'array', getAllEntries);
const getEntryByIdOpts = getSchemaGenerator(
    po_Tinh,
    'i',
    'object',
    getEntryById
);
const postEntryOpts = postSchemaGenerator(po_Tinh, 'p', postEntry);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
