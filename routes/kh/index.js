'use strict';

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../controllers/kh');

// customer/KhachHang schema
const Customer = {
    type: 'object',
    properties: {
        sTen: { type: 'string' },
        sDienThoai: { type: 'string' },
        iTrangThai: { type: 'number' },
        sMa: { type: 'string' },
    },
};

const getCustomersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                customers: Customer,
            },
        },
    },
    handler: getAllEntries,
};

const getCustomerByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                customers: Customer,
            },
        },
    },
    handler: getEntryById,
};

const postCustomerOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                sTen: { type: 'string' },
                sDienThoai: { type: 'string' },
                iTrangThai: { type: 'number' },
                sMa: { type: 'string' },
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

const deleteCustomerOpts = {
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
    fastify.get('/', getCustomersOpts);
    fastify.get('/:id', getCustomerByIdOpts);
    fastify.post('/', postCustomerOpts);
    fastify.delete('/:id', deleteCustomerOpts);
};
