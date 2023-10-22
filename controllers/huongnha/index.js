'use strict';
const { po_HuongNha } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
} = require('../standard');
const { table } = require('./constants');

const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_HuongNha, table);
};

const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_HuongNha, table);
};

const postEntry = async (request, reply) => {
    return postEntryStd(request, reply, po_HuongNha, table);
};

const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_HuongNha, table);
};

module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
};
