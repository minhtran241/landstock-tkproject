'use strict';
const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../controllers/bds');

const { po_BDS } = require('../../utilities/paramsOperations');
const {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
} = require('../../utilities/routes/schemaGenerators');

const getEntriesOpts = getSchemaGenerator(po_BDS, 's', 'array', getAllEntries);
const getEntryByIdOpts = getSchemaGenerator(
    po_BDS,
    'i',
    'object',
    getEntryById,
    [
        {
            files: 'array',
        },
    ]
);
const postEntryOpts = postSchemaGenerator(po_BDS, 'p', postEntry, [
    {
        files: 'array',
    },
]);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
