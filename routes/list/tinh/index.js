'use strict';

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/tinh');

// city/Tinh schema
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
    handler: getAllEntries,
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
    handler: getEntryById,
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
    handler: postEntry,
};

const deleteCityOpts = {
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
    fastify.get('/', getCitiesOpts);
    fastify.get('/:id', getCityByIdOpts);
    fastify.post('/', postCityOpts);
    fastify.delete('/:id', deleteCityOpts);
};
