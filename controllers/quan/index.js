'use strict';
const client = require('../../data/clickhouse');
const { po_Quan } = require('../../utilities/paramsOperations');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
} = require('../../utilities/queryGenerators');
const { table } = require('./constants');

// Function to get all districts
const getDistricts = async (request, reply) => {
    try {
        // const query = getDistrictsQuery(request.query);
        const query = getSelectQuery(request.query, po_Quan, table);
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const districtSet = await resultSet.json();
        reply.send(districtSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

// Function to get a district by its ID
const getDistrictById = async (request, reply) => {
    // const query = getDistrictByIdQuery(request.params);

    try {
        const query = getSelectByIdQuery(
            request.params,
            po_Quan,
            table,
            'iID_MaQuan'
        );
        const result = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const district = await result.json();
        if (district === null) {
            // Handle the case where no data was found for the given ID
            reply.status(404).send({ error: 'district not found' });
            return;
        }
        reply.send(district);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

// Function to insert a new district
const postDistrict = async (request, reply) => {
    try {
        // const value = cleanAndConvert(request.body);
        const value = getPostQueryValues(request.body, po_Quan);
        await client.insert({
            table,
            values: [value],
            format: 'JSONEachRow',
        });
        reply.code(201).send({ message: 'district inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

// Function to delete a district by its ID
const deleteDistrict = async (request, reply) => {
    // const query = deleteDistrictByIdQuery(request.params);
    try {
        const query = getDeleteQuery(request.params, table, 'iID_MaQuan');
        await client.query({
            query,
            query_params: { id: Number(id) },
        });
        reply.send({ message: 'district deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getDistricts,
    getDistrictById,
    postDistrict,
    deleteDistrict,
};
