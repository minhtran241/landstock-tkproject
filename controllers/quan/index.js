'use strict';
const { po_Quan } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
} = require('../standard');
const { table } = require('./constants');

// Function to get all districts
const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_Quan, table);
};

// Function to get a district by its ID
const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_Quan, table);
};

// Function to insert a new district
const postEntry = async (request, reply) => {
    return postEntryStd(request, reply, po_Quan, table);
};

// Function to delete a district by its ID
const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_Quan, table);
};

module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
};
