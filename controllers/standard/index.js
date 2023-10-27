'use strict';
const client = require('../../data/clickhouse');
const {
    funcParamsToQueries,
    queriesToResults,
} = require('../../utilities/funcParamsProcessing');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
} = require('../../utilities/piplines/queryGenerators');
const { convertToType } = require('../../utilities/piplines/sanitization');

const getAllEntriesStd = async (request, reply, po_Name, table) => {
    try {
        const { query } = getSelectQuery(request.query, po_Name, table);
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        let data = await resultSet.json();
        convertToType(po_Name, data);
        if (data !== null) {
            reply.code(200).send(data);
        } else {
            reply.code(404).send({ error: 'data not found' });
        }
    } catch (error) {
        handleError(error, reply);
    }
};

const getAllEntriesWithFuncStd = async (request, reply, po_Name, table) => {
    if (!request.query.f) {
        reply.code(400).send({ error: 'No functions provided' });
        return;
    }

    try {
        const { query, limit, skip } = getSelectQuery(
            request.query,
            po_Name,
            table
        );
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        let data = await resultSet.json();
        convertToType(po_Name, data);

        if (data !== null) {
            const funcs = request.query.f.split(',') || [];
            const funcQueries = funcParamsToQueries(
                funcs,
                request.query,
                po_Name,
                table
            );
            const funcResults = await queriesToResults(client, funcQueries);
            const result = { data, ...funcResults, limit, skip };
            reply.code(200).send(result);
        } else {
            reply.code(404).send({ error: 'Data not found' });
        }
    } catch (error) {
        handleError(error, reply);
    }
};

const getEntryByIdStd = async (request, reply, po_Name, table) => {
    try {
        const query = getSelectByIdQuery(request.params, po_Name, table);
        const result = await client.query({
            query,
            format: 'JSONEachRow',
        });
        let data = await result.json();
        convertToType(po_Name, data);
        if (data !== null) {
            reply.code(200).send(data[0]);
        } else {
            reply.code(404).send({ error: 'data not found' });
        }
    } catch (error) {
        handleError(error, reply);
    }
};

const postEntryStd = async (request, reply, po_Name, table) => {
    try {
        // Remove null, undefined values, or not allowed post values from the object
        const cleanedValues = getPostQueryValues(request.body, po_Name);

        // Insert the values into the ClickHouse table
        await client.insert({
            table,
            values: cleanedValues,
            format: 'JSONEachRow',
        });

        reply.code(201).send({ message: 'entity inserted successfully' });
    } catch (error) {
        handleError(error, reply);
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
        handleError(error, reply);
    }
};

function handleError(error, reply) {
    let errorMessage = 'Error';
    if (error.name === 'ClickHouseSyntaxError') {
        errorMessage = 'ClickHouse Syntax error';
    } else if (error.name === 'ClickHouseNetworkError') {
        errorMessage = 'ClickHouse Network error';
    }

    console.error(errorMessage + ':', error);
    reply
        .code(500)
        .send({ error: 'Internal Server Error', message: error.message });
}

module.exports = {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getAllEntriesWithFuncStd,
};
