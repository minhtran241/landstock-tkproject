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
    // try {
    //     const query = getSelectQuery(request.query, po_KhachHang, table);
    //     const resultSet = await client.query({
    //         query,
    //         format: 'JSONEachRow',
    //     });
    //     const customerSet = await resultSet.json();
    //     reply.send(customerSet);
    // } catch (error) {
    //     console.error('Error executing ClickHouse query:', error);
    //     reply.status(500).send({ error: 'query failed' });
    // }
};

// Function to get a customer by its sID
const getCustomerById = async (request, reply) => {
    return getByIdStandard(request, reply, po_KhachHang, table, 'sID');
    // try {
    //     const query = getSelectByIdQuery(
    //         request.params,
    //         po_KhachHang,
    //         table,
    //         'sID'
    //     );
    //     const result = await client.query({
    //         query,
    //         format: 'JSONEachRow',
    //     });
    //     const customer = await result.json();
    //     if (customer === null) {
    //         // Handle the case where no data was found for the given ID
    //         reply.status(404).send({ error: 'customer not found' });
    //         return;
    //     }
    //     reply.send(customer);
    // } catch (error) {
    //     console.error('Error executing ClickHouse query:', error);
    //     throw error;
    // }
};

// Function to insert a new customer
const postCustomer = async (request, reply) => {
    return postStandard(request, reply, po_KhachHang, table);
    // try {
    //     const value = getPostQueryValues(request.body, po_KhachHang);
    //     await client.insert({
    //         table,
    //         values: [value],
    //         format: 'JSONEachRow',
    //     });
    //     reply.code(201).send({ message: 'customer inserted successfully' });
    // } catch (error) {
    //     console.error('Error executing ClickHouse query:', error);
    //     reply.status(500).send({ error: 'query failed' });
    // }
};

// Function to delete a customer by its sID
const deleteCustomer = async (request, reply) => {
    return deleteStandard(request, reply, po_KhachHang, 'sID');
    // try {
    //     const query = getDeleteQuery(request.params, table, 'sID');
    //     await client.query({
    //         query,
    //     });
    //     reply.send({ message: 'customer deleted successfully' });
    // } catch (error) {
    //     console.error('Error executing ClickHouse query:', error);
    //     reply.status(500).send({ error: 'query failed' });
    // }
};

module.exports = {
    getCustomers,
    getCustomerById,
    postCustomer,
    deleteCustomer,
};
