'use strict';
const client = require('../../data/clickhouse');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
} = require('../../utilities/piplines/queryGenerators');

const getAllEntriesStd = async (request, reply, po_Name, table) => {
    try {
        const query = getSelectQuery(request.query, po_Name, table);
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const entitySet = await resultSet.json();
        reply.send(entitySet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const getEntryByIdStd = async (request, reply, po_Name, table) => {
    try {
        const query = getSelectByIdQuery(request.params, po_Name, table);
        const entity = await client
            .query({
                query,
                format: 'JSONEachRow',
            })
            .toPromise();
        // const entity = await result.toPromise();
        console.info(entity);
        if (entity === null) {
            // Handle the case where no data was found for the given sID
            reply.status(404).send({ error: 'entity not found' });
            return;
        }
        reply.send(entity);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
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
        reply.status(500).send({ error: 'Insertion failed' });
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
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
};
