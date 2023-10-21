'use strict';
const { po_HuongNha } = require('../../utilities/paramsOperations');
const {
    getAllStandard,
    getByIdStandard,
    postStandard,
} = require('../standard');
const { table } = require('./constants');

const getDirections = async (request, reply) => {
    return getAllStandard(request, reply, po_HuongNha, table);
};

const getDirectionById = async (request, reply) => {
    return getByIdStandard(request, reply, po_HuongNha, table, 'iID_HuongNha');
};

const postDirection = async (request, reply) => {
    return postStandard(request, reply, po_HuongNha, table);
};

const deleteDirection = async (request, reply) => {
    return postStandard(request, reply, po_HuongNha, table);
};

module.exports = {
    getDirections,
    getDirectionById,
    postDirection,
    deleteDirection,
};
