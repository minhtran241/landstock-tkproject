'use strict';
const { po_LoaiHang } = require('../../utilities/paramsOperations');
const {
    getAllStandard,
    getByIdStandard,
    postStandard,
    deleteStandard,
} = require('../standard');
const { table } = require('./constants');

// Function to get all sections
const getSections = async (request, reply) => {
    return getAllStandard(request, reply, po_LoaiHang, table);
};

// Function to get a section by its Code
const getSectionByCode = async (request, reply) => {
    return getByIdStandard(request, reply, po_LoaiHang, table, 'sCode');
};

// Function to insert a new section
const postSection = async (request, reply) => {
    return postStandard(request, reply, po_LoaiHang, table);
};

// Function to delete a section by its Code
const deleteSection = async (request, reply) => {
    return deleteStandard(request, reply, po_LoaiHang, table, 'sCode');
};

module.exports = {
    getSections,
    getSectionByCode,
    postSection,
    deleteSection,
};
