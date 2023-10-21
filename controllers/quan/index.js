'use strict';
const { po_Quan } = require('../../utilities/paramsOperations');
const {
    getAllStandard,
    getByIdStandard,
    postStandard,
    deleteStandard,
} = require('../standard');
const { table } = require('./constants');

// Function to get all districts
const getDistricts = async (request, reply) => {
    return getAllStandard(request, reply, po_Quan, table);
};

// Function to get a district by its ID
const getDistrictById = async (request, reply) => {
    return getByIdStandard(request, reply, po_Quan, table, 'iID_MaQuan');
};

// Function to insert a new district
const postDistrict = async (request, reply) => {
    return postStandard(request, reply, po_Quan, table);
};

// Function to delete a district by its ID
const deleteDistrict = async (request, reply) => {
    return deleteStandard(request, reply, po_Quan, table, 'iID_MaQuan');
};

module.exports = {
    getDistricts,
    getDistrictById,
    postDistrict,
    deleteDistrict,
};
