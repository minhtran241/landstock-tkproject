'use strict';

const { getWards, postWard, deleteWard } = require('../../../controllers/quan');

// ward/phường xã schema
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
    fastify.post('/', postWardOpts);
    fastify.delete('/:id', deleteWardOpts);
};
