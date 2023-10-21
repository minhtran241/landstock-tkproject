'use strict';
const { po_KhachHang } = require('../../utilities/paramsOperations');
const {
    getAllStandard,
    getByIdStandard,
    postStandard,
    deleteStandard,
} = require('../standard');
const { table } = require('./constants');

// Function to get all customers
const getCustomers = async (request, reply) => {
    return getAllStandard(request, reply, po_KhachHang, table);
};

// Function to get a customer by its sID
const getCustomerById = async (request, reply) => {
    return getByIdStandard(request, reply, po_KhachHang, table, 'sID');
};

// Function to insert a new customer
const postCustomer = async (request, reply) => {
    return postStandard(request, reply, po_KhachHang, table);
};

// Function to delete a customer by its sID
const deleteCustomer = async (request, reply) => {
    return deleteStandard(request, reply, po_KhachHang, 'sID');
};

module.exports = {
    getCustomers,
    getCustomerById,
    postCustomer,
    deleteCustomer,
};
