'use strict';
const client = require('../../data/clickhouse');
const { removeNullValues } = require('../../utilities/queryHelper');
const { table, replyCols } = require('./constants');

// Function to get all customers
const getCustomers = async (request, reply) => {
    try {
        const query = `SELECT ${replyCols} FROM ${table}`;
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const customerSet = await resultSet.json();
        reply.send(customerSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

// Function to get a customer by its sID
const getCustomerById = async (request, reply) => {
    const { sID } = request.params;
    const query = `SELECT ${replyCols} FROM ${table} WHERE sID = toUUID({sID: String})`;

    try {
        const result = await client.query({
            query,
            query_params: { sID: String(sID) },
            format: 'JSONEachRow',
        });
        const customer = await result.json();
        if (customer === null) {
            // Handle the case where no data was found for the given ID
            reply.status(404).send({ error: 'customer not found' });
            return;
        }
        reply.send(customer);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

// Function to insert a new customer
const postCustomer = async (request, reply) => {
    try {
        const { sTen, sDienThoai, sEmail, iTrangThai, sMa } = request.body;
        await client.insert({
            table,
            values: [
                {
                    sTen: String(sTen),
                    sDienThoai: String(sDienThoai),
                    sEmail: String(sEmail),
                    iTrangThai: Number(iTrangThai),
                    sMa: String(sMa),
                },
            ],
            format: 'JSONEachRow',
        });
        reply.code(201).send({ message: 'customer inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

// Function to delete a customer by its sID
const deleteCustomer = async (request, reply) => {
    const { sID } = request.params;
    const query = `ALTER TABLE ${table} DELETE WHERE sID = toUUID({sID: String})`;
    try {
        await client.query({
            query,
            query_params: { sID: String(sID) },
        });
        reply.send({ message: 'customer deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    postCustomer,
    deleteCustomer,
};
