'use strict';

const {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem,
} = require('../../controllers/items');

// item schema
const Item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
    },
};

const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item,
            },
        },
    },
    handler: getItems,
};

const getItemOpts = {
    schema: {
        response: {
            200: Item,
        },
    },
    handler: getItem,
};

const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            },
        },
        response: {
            201: Item,
        },
    },
    handler: addItem,
};

const deleteItemOpts = {
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
    handler: deleteItem,
};

const updateItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            },
        },
        response: {
            200: Item,
        },
    },
    handler: updateItem,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getItemsOpts);
    fastify.get('/:id', getItemOpts);
    fastify.post('/', postItemOpts);
    fastify.delete('/:id', deleteItemOpts);
    fastify.put('/:id', updateItemOpts);
};
