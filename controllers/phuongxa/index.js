'use strict';
const { po_PhuongXa } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
} = require('../standard');
const { table } = require('./constants');

const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_PhuongXa, table);
};

const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_PhuongXa, table);
};

const postEntrypostWard = async (request, reply) => {
    return postEntryStd(request, reply, po_PhuongXa, table);
};

const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_PhuongXa, table);
};

module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
};
