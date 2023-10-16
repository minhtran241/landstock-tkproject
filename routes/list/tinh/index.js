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
            properties: {
                iID_MaTinh: { type: 'integer' },
                sTenTinh: { type: 'string' },
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
    handler: postCity,
};

const deleteCityOpts = {
    schema: {
        response: {
            200: {
                properties: {
                    type: 'object',
                    message: { type: 'string' },
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
