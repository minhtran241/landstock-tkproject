'use strict';
const { table } = require('./constants');
const { po_BDS } = require('../../utilities/paramsOperations');
const {
    getAllStandard,
    getByIdStandard,
    postStandard,
    deleteStandard,
} = require('../standard');

const getRealEstates = async (request, reply) => {
    return getAllStandard(request, reply, po_BDS, table);
};

// Function to get a real estate by its sID
const getRealEstateById = async (request, reply) => {
    return getByIdStandard(request, reply, po_BDS, table, 'sID');
};

// Function to insert a new real estate
const postRealEstate = async (request, reply) => {
    return postStandard(request, reply, po_BDS, table);
};

// Function to delete a real estate by its sID
const deleteRealEstate = async (request, reply) => {
    return deleteStandard(request, reply, po_BDS, table, 'sID');
};

module.exports = {
    getRealEstates,
    getRealEstateById,
    postRealEstate,
    deleteRealEstate,
};
