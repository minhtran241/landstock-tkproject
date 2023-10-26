'use strict';
const client = require('../../data/clickhouse');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
} = require('../../utilities/piplines/queryGenerators');
const { convertToType } = require('../../utilities/piplines/sanitization');

const getAllEntriesStd = async (request, reply, po_Name, table) => {
    try {
        const query = getSelectQuery(request.query, po_Name, table);
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        let entitySet = await resultSet.json();
        entitySet = convertToType(po_Name, entitySet);
        if (entitySet !== null) {
            reply.code(200).send(entitySet);
        } else {
            reply.code(404).send({ error: 'entity not found' });
        }
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getEntryByIdStd = async (request, reply, po_Name, table) => {
    try {
        const query = getSelectByIdQuery(request.params, po_Name, table);
        const result = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const entity = await result.json();
        if (entity !== null) {
            reply.code(200).send(entity[0]);
        } else {
            reply.code(404).send({ error: 'entity not found' });
        }
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const postEntryStd = async (request, reply, po_Name, table) => {
    try {
        // Remove null, undefined values, or not allowed post values from the object
        const cleanedValues = getPostQueryValues(request.body, po_Name);

        // Insert the values into the ClickHouse table
        await client.insert({
            table,
            values: [cleanedValues],
            format: 'JSONEachRow',
        });

        reply.code(201).send({ message: 'entity inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const deleteEntryStd = async (request, reply, po_Name) => {
    const query = getDeleteQuery(request.params, po_Name, table);
    try {
        await client.query({
            query,
        });
        reply.send({ message: 'entity deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
};
