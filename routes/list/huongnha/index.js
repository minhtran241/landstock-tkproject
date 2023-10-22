'use strict';

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/huongnha');

// direction/HuongNha schema
const Direction = {
    type: 'object',
    properties: {
        iID_HuongNha: { type: 'integer' },
        sHuongNha: { type: 'string' },
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
    handler: getAllEntries,
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
    handler: getEntryById,
};

const postDirectionOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                iID_HuongNha: { type: 'integer' },
                sHuongNha: { type: 'string' },
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
    handler: deleteEntry,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getDirectionsOpts);
    fastify.get('/:id', getDirectionByIdOpts);
    fastify.post('/', postDirectionOpts);
    fastify.delete('/:id', deleteDirectionOpts);
};
