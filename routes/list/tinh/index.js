'use strict';

const { getCities, getCity, postCity } = require('../../../controllers/tinh');

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

const getCityOpts = {
    schema: {
        response: {
            200: City,
        },
    },
    handler: getCity,
};

const postCityOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['sTenTinh'],
            properties: {
                sTenTinh: { type: 'string' },
            },
        },
        response: {
            201: City,
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
    fastify.get('/:id', getCityOpts);
    fastify.post('/', postCityOpts);
    // fastify.delete('/:id', deleteCityOpts);
};
