'use strict';
const client = require('../../data/clickhouse');
const { po_Tinh } = require('../../utilities/paramsOperations');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
} = require('../../utilities/queryGenerators');
const { table } = require('./constants');

// Function to get all cities
const getCities = async (request, reply) => {
    try {
        // const query = `SELECT iID_MaTinh, sTenTinh FROM ${table}`;
        const query = getSelectQuery(request.query, po_Tinh, table);
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const citySet = await resultSet.json();
        reply.send(citySet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

// Function to get a city by its ID
const getCityById = async (request, reply) => {
    // const { id } = request.params;
    // const query = `SELECT iID_MaTinh, sTenTinh FROM ${table} WHERE iID_MaTinh = {id: Int64}`;

    try {
        const query = getSelectByIdQuery(
            request.params,
            po_Tinh,
            table,
            'iID_MaTinh'
        );
        const result = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const city = await result.json();
        console.log(city);
        if (city === null) {
            // Handle the case where no data was found for the given ID
            reply.status(404).send({ error: 'city not found' });
            return;
        }
        reply.send(city);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

// Function to insert a new city
const postCity = async (request, reply) => {
    try {
        // const value = cleanAndConvert(request.body);
        const value = getPostQueryValues(request.body, po_Tinh);
        await client.insert({
            table,
            values: [value],
            format: 'JSONEachRow',
        });
        reply.code(201).send({ message: 'city inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};
// Function to delete a city by its ID
const deleteCity = async (request, reply) => {
    // const { id } = request.params;
    // const query = `ALTER TABLE ${table} DELETE WHERE iID_MaTinh = {id: Int64}`;
    try {
        const query = getDeleteQuery(request.params, table, 'iID_MaTinh');
        await client.query({
            query,
        });
        reply.send({ message: 'city deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getCities,
    getCityById,
    postCity,
    deleteCity,
};
