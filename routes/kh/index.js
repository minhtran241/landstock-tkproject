'use strict';
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
} = require('../../utilities/schemaGenerators');
const { po_KhachHang } = require('../../utilities/paramsOperations');

const getEntriesOpts = getSchemaGenerator(
    po_KhachHang,
    's',
    'array',
    getAllEntries
);
const getEntryByIdOpts = getSchemaGenerator(
    po_KhachHang,
    'i',
    'array',
    getEntryById
);
const postEntryOpts = postSchemaGenerator(
    poToSchemaProperties(po_BDS, 'p'),
    postEntry
);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
