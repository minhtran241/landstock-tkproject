'use strict';
const { po_Tinh } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
} = require('../standard');
const { table } = require('./constants');

// Function to get all cities
const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_Tinh, table);
};

// Function to get a city by its ID
const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_Tinh, table, 'iID_MaTinh');
};

// Function to insert a new city
const postEntry = async (request, reply) => {
    return postEntryStd(request, reply, po_Tinh, table);
};
// Function to delete a city by its ID
const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_Tinh, table, 'iID_MaTinh');
};

module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
};
