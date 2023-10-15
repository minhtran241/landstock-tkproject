'use strict';

const {
    getCities,
    getCityById,
    postCity,
} = require('../../../controllers/tinh');

// city/tỉnh schema
const City = {
    type: 'object',
    properties: {
        iID_MaTinh: { type: 'number' },
        sTenTinh: { type: 'string' },
    },
};

const getCitiesOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                cities: City,
            },
        },
    },
    handler: getCities,
};

const getCityByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                cities: City,
            },
        },
    },
    handler: getCityById,
};

const postCityOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['iID_MaTinh, sTenTinh'],
            properties: {
                iID_MaTinh: { type: 'number' },
                sTenTinh: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'array',
                cities: City,
            },
        },
    },
    handler: postCity,
};

const deleteCityOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    sTenTinh: { type: 'string' },
                },
            },
        },
    },
    // handler: deleteItem,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getCitiesOpts);
    fastify.get('/:id', getCityByIdOpts);
    fastify.post('/', postCityOpts);
    // fastify.delete('/:id', deleteCityOpts);
};
