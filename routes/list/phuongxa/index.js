'use strict';

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/phuongxa');

// ward/PhuongXa schema
const Ward = {
    type: 'object',
    properties: {
        iID_MaPhuongXa: { type: 'integer' },
        sTenPhuongXa: { type: 'string' },
        iID_MaQuan: { type: 'integer' },
    },
};

const getWardsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                wards: Ward,
            },
        },
    },
    handler: getAllEntries,
};

const getWardByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                wards: Ward,
            },
        },
    },
    handler: getEntryById,
};

const postWardOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                iID_MaPhuongXa: { type: 'integer' },
                sTenPhuongXa: { type: 'string' },
                iID_MaQuan: { type: 'integer' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: postEntry,
};

const deleteWardOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteEntry,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getWardsOpts);
    fastify.get('/:id', getWardByIdOpts);
    fastify.post('/', postWardOpts);
    fastify.delete('/:id', deleteWardOpts);
};
