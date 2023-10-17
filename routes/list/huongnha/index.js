'use strict';

const {
    getDirections,
    getDirectionById,
    postDirection,
    deleteDirection,
} = require('../../../controllers/huongnha');

// direction/HuongNha schema
const Direction = {
    type: 'object',
    properties: {
        iID_MaQuan: { type: 'integer' },
        sTenQuan: { type: 'string' },
    },
};

const getDirectionsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                directions: Direction,
            },
        },
    },
    handler: getDirections,
};

const getDirectionByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                directions: Direction,
            },
        },
    },
    handler: getDirectionById,
};

const postDirectionOpts = {
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
    handler: postDirection,
};

const deleteDirectionOpts = {
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
    handler: deleteDirection,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getDirectionsOpts);
    fastify.get('/:id', getDirectionByIdOpts);
    fastify.post('/', postDirectionOpts);
    fastify.delete('/:id', deleteDirectionOpts);
};
