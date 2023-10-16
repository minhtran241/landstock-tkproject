'use strict';

const {
    getDistricts,
    getDistrictById,
    postDistrict,
    deleteDistrict,
} = require('../../../controllers/quan');

// district/quận schema
const District = {
    type: 'object',
    properties: {
        iID_MaQuan: { type: 'integer' },
        sTenQuan: { type: 'string' },
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
    handler: getDistricts,
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
    handler: getDistrictById,
};

const postDistrictOpts = {
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
    handler: postDistrict,
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
    handler: deleteDistrict,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getDistrictsOpts);
    fastify.get('/:id', getDistrictByIdOpts);
    fastify.post('/', postDistrictOpts);
    fastify.delete('/:id', deleteDistrictOpts);
};
