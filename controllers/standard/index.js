'use strict';
const client = require('../../data/clickhouse');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
    funcParamToQuery,
} = require('../../utilities/piplines/queryGenerators');
const {
    convertToType,
    sanitizeGetFuncResponse,
} = require('../../utilities/piplines/sanitization');

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
            reply.code(404).send({ error: 'Data not found' });
        }
    } catch (error) {
        handleError(error, reply);
    }
};

const getFuncValueStd = async (request, reply, po_Name, table) => {
    try {
        if (!request.query.f) {
            throw new Error('No function specified');
        }
        const func = request.query.f.split(',')[0];
        const funcQuery = funcParamToQuery(func, request.query, po_Name, table);
        const resultSet = await client.query({
            query: funcQuery,
            format: 'JSONEachRow',
        });
        const data = await resultSet.json();
        const sanitizedData = sanitizeGetFuncResponse(data, func);
        reply.code(200).send(sanitizedData);
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
            reply.code(404).send({ error: 'Data not found' });
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

        reply.code(201).send({ message: 'Data inserted successfully' });
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
        reply.send({ message: 'Data deleted successfully' });
    } catch (error) {
        handleError(error, reply);
    }
};

function handleError(error, reply) {
    let errorCode = 500;
    let errorMessage = 'Internal server error';
    const dbErrors = ['ClickHouseSyntaxError', 'ClickHouseNetworkError'];
    if (dbErrors.includes(error.name)) {
        errorCode = 500;
        errorMessage = 'Internal server error';
    } else {
        errorCode = 400;
        errorMessage = 'Bad request';
    }

    console.error(errorMessage + ':', error);
    reply.code(errorCode).send({ error: errorMessage });
}

module.exports = {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getFuncValueStd,
};
