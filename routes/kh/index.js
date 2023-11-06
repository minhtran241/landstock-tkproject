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
} = require('../../utilities/routes/schemaGenerators');
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
    'object',
    getEntryById
);
const postEntryOpts = postSchemaGenerator(po_KhachHang, 'p', postEntry);
const deleteEntryOpts = deleteSchemaGenerator(deleteEntry);

module.exports = async function (fastify, opts) {
    const jwtVerifyHook = { onRequest: [fastify.verifyJWT] };

    fastify.get('/', getEntriesOpts);
    fastify.get('/:id', getEntryByIdOpts);
    fastify.post('/', { ...postEntryOpts, ...jwtVerifyHook });
    fastify.delete('/:id', deleteEntryOpts);
};
