'use strict';
const { table } = require('./constants');
const { po_BDS } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getAllEntriesWithFuncStd,
} = require('../standard');

const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_BDS, table);
};

// Function to get a real estate by its sID
const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_BDS, table);
};

// Function to insert a new real estate
const postEntry = async (request, reply) => {
    return postEntryStd(request, reply, po_BDS, table);
};

// Function to delete a real estate by its sID
const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_BDS, table);
};

const getAllEntriesWithFunc = async (request, reply) => {
    return getAllEntriesWithFuncStd(request, reply, po_BDS, table);
};

module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
    getAllEntriesWithFunc,
};
