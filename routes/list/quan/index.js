'use strict';

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/quan');

// district/Quan schema
const District = {
    type: 'object',
    properties: {
        iID_MaQuan: { type: 'integer' },
        sTenQuan: { type: 'string' },
        iID_MaTinh: { type: 'integer' },
    },
};

const getDistrictsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                districts: District,
            },
        },
    },
    handler: getAllEntries,
};

const getDistrictByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                districts: District,
            },
        },
    },
    handler: getEntryById,
};

const postDistrictOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                iID_MaQuan: { type: 'integer' },
                sTenQuan: { type: 'string' },
                iID_MaTinh: { type: 'integer' },
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

const deleteDistrictOpts = {
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
    fastify.get('/', getDistrictsOpts);
    fastify.get('/:id', getDistrictByIdOpts);
    fastify.post('/', postDistrictOpts);
    fastify.delete('/:id', deleteDistrictOpts);
};
