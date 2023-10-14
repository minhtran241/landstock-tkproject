'use strict';

let items = require('../../Item');

const getItems = async (request, reply) => {
    reply.send(items);
};

const getItem = async (request, reply) => {
    const { id } = request.params;
    const item = items.find((item) => item.id === Number(id));
    reply.send(item);
};

const addItem = async (request, reply) => {
    const { name } = request.body;
    const item = {
        id: items.length + 1,
        name,
    };
    items.push(item);
    console.log(items);
    reply.code(201).send(item);
};

const deleteItem = async (request, reply) => {
    const { id } = request.params;
    items = items.filter((item) => item.id !== Number(id));
    console.log(id);
    reply.send({
        message: `Item ${id} has been removed`,
    });
};

const updateItem = async (request, reply) => {
    const { id } = request.params;
    const { name } = request.body;
    const item = items.find((item) => item.id === Number(id));
    item.name = name;
    reply.send(item);
};

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem,
};
