'use strict';
const { po_Tinh } = require('../../utilities/paramsOperations');
const {
    getAllStandard,
    getByIdStandard,
    postStandard,
    deleteStandard,
} = require('../standard');
const { table } = require('./constants');

// Function to get all cities
const getCities = async (request, reply) => {
    return getAllStandard(request, reply, po_Tinh, table);
};

// Function to get a city by its ID
const getCityById = async (request, reply) => {
    return getByIdStandard(request, reply, po_Tinh, table, 'iID_MaTinh');
};

// Function to insert a new city
const postCity = async (request, reply) => {
    return postStandard(request, reply, po_Tinh, table);
};
// Function to delete a city by its ID
const deleteCity = async (request, reply) => {
    return deleteStandard(request, reply, po_Tinh, table, 'iID_MaTinh');
};

module.exports = {
    getCities,
    getCityById,
    postCity,
    deleteCity,
};
