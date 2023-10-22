'use strict';
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
} = require('../../../utilities/schemaGenerators');
const { po_LoaiHang } = require('../../../utilities/paramsOperations');

const getEntriesOpts = getSchemaGenerator(
    po_LoaiHang,
    's',
    'array',
    getAllEntries
);
const getEntryByIdOpts = getSchemaGenerator(
    po_LoaiHang,
    'i',
    'array',
    getEntryById
);
const postEntryOpts = postSchemaGenerator(po_LoaiHang, 'p', postEntry);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', postEntryOpts);
    fastify.delete('/:id', deleteEntryOpts);
};
