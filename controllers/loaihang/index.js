'use strict';
const { po_LoaiHang } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
} = require('../standard');
const { table } = require('./constants');

// Function to get all sections
const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_LoaiHang, table);
};

// Function to get a section by its Code
const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_LoaiHang, table);
};

// Function to insert a new section
const postEntry = async (request, reply) => {
    return postEntryStd(request, reply, po_LoaiHang, table);
};

// Function to delete a section by its Code
const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_LoaiHang, table);
};

module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
};
