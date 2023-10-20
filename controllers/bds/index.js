'use strict';
const client = require('../../data/clickhouse');
const {
    getRealEstatesQuery,
    postRealEstateCleanedData,
    getRealEstateByIdQuery,
    deleteRealEstateByIdQuery,
} = require('./paramsHandler');
const { table } = require('./constants');

const getRealEstates = async (request, reply) => {
    try {
        const query = getRealEstatesQuery(request.query);
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
        const query = getRealEstateByIdQuery(request.params);
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
        // Remove null or undefined values from the object
        const cleanedValues = postRealEstateCleanedData(request.body);

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
    const query = deleteRealEstateByIdQuery(request.params);
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
