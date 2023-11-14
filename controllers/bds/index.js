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
    return getEntryByIdStd(
        request,
        reply,
        po_BDS,
        table,
        po_HinhAnh,
        imgTableq
    );
};

// Function to insert a new real estate
const postEntry = async (request, reply) => {
    const { files } = request.body;
    if (files) {
        files.map((file) => {
            file.sMa = request.body.sMa;
        });
        const fileRequest = { body: files };
        postEntryStd(fileRequest, null, po_HinhAnh, imgTable);
    }
    return postEntryStd(request, reply, po_BDS, table);
};

// Function to delete a real estate by its sID
const deleteEntry = async (request, reply) => {
    deleteEntryStd(request, null, po_HinhAnh, imgTable);
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
