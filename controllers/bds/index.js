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

const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_BDS, table);
};

// Function to get a real estate by its sID
const getEntryById = async (request, reply) => {
    const fileConfiguration = [
        {
            po_Files: po_HinhAnh,
            table_Files: imgTable,
        },
    ];
    return getEntryByIdStd(request, reply, po_BDS, table, fileConfiguration);
};

// Function to insert a new real estate
const postEntry = async (request, reply) => {
    const fileConfiguration = [
        {
            po_Files: po_HinhAnh,
            table_Files: imgTable,
            key_Files: 'files',
        },
    ];
    return postEntryStd(request, reply, po_BDS, table, fileConfiguration);
};

// Function to delete a real estate by its sID
const deleteEntry = async (request, reply) => {
    const fileConfiguration = [
        {
            po_Files: po_HinhAnh,
            table_Files: imgTable,
        },
    ];
    return deleteEntryStd(request, reply, po_BDS, table, fileConfiguration);
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
