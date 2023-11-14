'use strict';
const { table, imgTable } = require('./constants');
const { po_BDS, po_HinhAnh } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getFuncValueStd,
} = require('../standard');
const {
    getDeleteQuery,
} = require('../../utilities/controllers/queryGenerators');
const client = require('../../data/clickhouse');

const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_BDS, table);
};

// Function to get a real estate by its sID
const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_BDS, table, true);
};

// Function to insert a new real estate
const postEntry = async (request, reply) => {
    const { files } = request.body;
    if (files) {
        const fileRequest = { body: files };
        postEntryStd(fileRequest, reply, po_HinhAnh, imgTable);
    }
    return postEntryStd(request, reply, po_BDS, table);
};

// Function to delete a real estate by its sID
const deleteEntry = async (request, reply) => {
    deleteEntryStd(request, reply, po_HinhAnh, imgTable);
    const deleteFilesQuery = getDeleteQuery(
        request.params,
        po_HinhAnh,
        imgTable
    );
    await client.query({
        query: deleteFilesQuery,
    });
    return deleteEntryStd(request, reply, po_BDS, table);
};

const getFuncValue = async (request, reply) => {
    return getFuncValueStd(request, reply, po_BDS, table);
};

module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
    getFuncValue,
};
