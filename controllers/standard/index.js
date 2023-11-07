'use strict';

const client = require('../../data/clickhouse');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
    funcParamToQuery,
} = require('../../utilities/controllers/queryGenerators');
const {
    // convertToType,
    sanitizeGetFuncResponse,
} = require('../../utilities/controllers/sanitization');
const response = require('./response');

const getAllEntriesStd = async (request, reply, po_Name, table) => {
    try {
        const { query } = getSelectQuery(request.query, po_Name, table);
        const rows = await client.query({
            query,
            format: 'JSONEachRow',
        });
        let data = await rows.json();
        // convertToType(po_Name, data);
        if (data !== null && data.length > 0) {
            reply.code(200).send(data);
        } else {
            reply.code(response.NOT_FOUND.statusCode).send(response.NOT_FOUND);
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
        const rows = await client.query({
            query: funcQuery,
            format: 'JSONEachRow',
        });
        const data = await rows.json();
        const sanitizedData = sanitizeGetFuncResponse(data, func);
        reply.code(200).send(sanitizedData);
    } catch (error) {
        handleError(error, reply);
    }
};

const getEntryByIdStd = async (request, reply, po_Name, table) => {
    try {
        const query = getSelectByIdQuery(request.params, po_Name, table);
        const rows = await client.query({
            query,
            format: 'JSONEachRow',
        });
        let data = await rows.json();
        // convertToType(po_Name, data);
        if (data !== null && data.length > 0) {
            reply.code(200).send(data[0]);
        } else {
            reply.code(response.NOT_FOUND.statusCode).send(response.NOT_FOUND);
        }
    } catch (error) {
        handleError(error, reply);
    }
};

const postEntryStd = async (request, reply, po_Name, table) => {
    try {
        // Remove null, undefined values, or not allowed post values from the object
        const cleanedValues = getPostQueryValues(request.body, po_Name);
        console.log(cleanedValues);
        // Insert the values into the ClickHouse table
        await client.insert({
            table,
            values: cleanedValues,
            format: 'JSONEachRow',
        });

        // reply.code(201).send({ message: 'Data inserted successfully' });
        reply.code(response.CREATED.statusCode).send(response.CREATED);
    } catch (error) {
        handleError(error, reply);
    }
};

const deleteEntryStd = async (request, reply, po_Name, table) => {
    const query = getDeleteQuery(request.params, po_Name, table);
    try {
        await client.query({
            query,
        });
        // reply.code(200).send({ message: 'Data deleted successfully' });
        reply.code(response.OK.statusCode).send(response.OK);
    } catch (error) {
        handleError(error, reply);
    }
};

function handleError(error, reply) {
    let errorRes;
    const dbErrors = ['ClickHouseSyntaxError', 'ClickHouseNetworkError'];
    if (dbErrors.includes(error.name)) {
        errorRes = response.INTERNAL_SERVER_ERROR;
    } else {
        errorRes = response.BAD_REQUEST;
    }
    console.error(error);
    reply.code(statusCode).send(errorRes);
}

module.exports = {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getFuncValueStd,
};
