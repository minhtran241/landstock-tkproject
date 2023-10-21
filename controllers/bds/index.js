'use strict';
const client = require('../../data/clickhouse');
const { table } = require('./constants');
const { po_BDS } = require('../../utilities/paramsOperations');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
} = require('../../utilities/queryGenerators');

const getRealEstates = async (request, reply) => {
    try {
        const query = getSelectQuery(request.query, po_BDS, table);
        console.info(request.query);
        console.info(query);
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const realEstateSet = await resultSet.json();
        reply.send(realEstateSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

// Function to get a real estate by its sID
const getRealEstateById = async (request, reply) => {
    try {
        const query = getSelectByIdQuery(request.params, po_BDS, table, 'sID');
        const result = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const realEstate = await result.json();
        if (realEstate === null) {
            // Handle the case where no data was found for the given sID
            reply.status(404).send({ error: 'real estate not found' });
            return;
        }
        reply.send(realEstate);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

// Function to insert a new real estate
const postRealEstate = async (request, reply) => {
    try {
        // Remove null, undefined values, or not allowed post values from the object
        const cleanedValues = getPostQueryValues(request.body, po_BDS);

        // Insert the values into the ClickHouse table
        await client.insert({
            table,
            values: [cleanedValues],
            format: 'JSONEachRow',
        });

        reply.code(201).send({ message: 'real estate inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'Insertion failed' });
    }
};

// Function to delete a real estate by its sID
const deleteRealEstate = async (request, reply) => {
    const query = getDeleteQuery(request.params, table, 'sID');
    try {
        await client.query({
            query,
        });
        reply.send({ message: 'real estate deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getRealEstates,
    getRealEstateById,
    postRealEstate,
    deleteRealEstate,
};
