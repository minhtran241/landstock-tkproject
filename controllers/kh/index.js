'use strict';
const { po_KhachHang } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
} = require('../standard');
const { table } = require('./constants');

// Function to get all customers
const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_KhachHang, table);
};

// Function to get a customer by its sID
const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_KhachHang, table);
};

// Function to insert a new customer
const postEntry = async (request, reply) => {
    return postEntryStd(request, reply, po_KhachHang, table);
};

// Function to delete a customer by its sID
const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_KhachHang);
};

module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
};
