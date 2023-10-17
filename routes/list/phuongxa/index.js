'use strict';

const {
    getWards,
    getWardById,
    postWard,
    deleteWard,
} = require('../../../controllers/phuongxa');

// ward/PhuongXa schema
const Ward = {
    type: 'object',
    properties: {
        iID_MaQuan: { type: 'integer' },
        sTenQuan: { type: 'string' },
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
    handler: getWards,
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
    handler: getWardById,
};

const postWardOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                iID_MaQuan: { type: 'integer' },
                sTenQuan: { type: 'string' },
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
    handler: postWard,
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
    handler: deleteWard,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getWardsOpts);
    fastify.get('/:id', getWardByIdOpts);
    fastify.post('/', postWardOpts);
    fastify.delete('/:id', deleteWardOpts);
};
