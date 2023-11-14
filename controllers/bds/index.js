'use strict'; // Enable strict mode for better error handling

const { table } = require('./constants'); // Import constants for table names
const { po_BDS } = require('../../utilities/paramsOperations'); // Import utility functions for parameters operations
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getFuncValueStd,
} = require('../standard'); // Import standard CRUD functions for real estate entries

// Function to get all real estate entries
const getAllEntries = async (request, reply) => {
    // Call the standard function to get all entries
    return getAllEntriesStd(request, reply, po_BDS, table);
};

// Function to get a real estate entry by its sID
const getEntryById = async (request, reply) => {
    // Call the standard function to get an entry by ID with files data
    return getEntryByIdStd(request, reply, po_BDS, table, true);
};

// Function to insert a new real estate entry
const postEntry = async (request, reply) => {
    // Call the standard function to insert a new entry with files data
    return postEntryStd(request, reply, po_BDS, table, true);
};

// Function to delete a real estate entry by its sID
const deleteEntry = async (request, reply) => {
    // Call the standard function to delete an entry with files data
    return deleteEntryStd(request, reply, po_BDS, table, true);
};

// Function to get functional values for real estate entries
const getFuncValue = async (request, reply) => {
    // Call the standard function to get functional values for entries
    return getFuncValueStd(request, reply, po_BDS, table);
};

// Export functions for use in other modules
module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
    getFuncValue,
};
