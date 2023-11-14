'use strict';

const client = require('../../data/clickhouse');
const httpResponses = require('../../http/httpResponses');
const { handleError } = require('../../utilities/controllers/actionGenerators');
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
    funcParamToQuery,
} = require('../../utilities/controllers/queryGenerators');
const {
    sanitizeGetFuncResponse,
} = require('../../utilities/controllers/sanitization');
const {
    processFileAttributes,
    processFileInserts,
    processFileDeletions,
} = require('./fileControllers');

// Function to get all entries from a table
const getAllEntriesStd = async (request, reply, po_Name, table) => {
    try {
        const { query } = getSelectQuery(request.query, po_Name, table);
        const rows = await client.query({ query, format: 'JSONEachRow' });
        let data = await rows.json();

        if (data !== null && data.length > 0) {
            reply.code(200).send(data);
        } else {
            reply
                .code(httpResponses.NOT_FOUND.statusCode)
                .send(httpResponses.NOT_FOUND);
        }
    } catch (error) {
        handleError(error, reply);
    }
};

// Function to get functional values for entries
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

// Function to get an entry by its ID
const getEntryByIdStd = async (
    request,
    reply,
    po_Name,
    table,
    fileConfiguration = null
) => {
    try {
        const query = getSelectByIdQuery(request.params, po_Name, table);
        const rows = await client.query({ query, format: 'JSONEachRow' });
        let data = await rows.json();

        if (fileConfiguration) {
            await processFileAttributes(
                po_Name,
                request.params,
                data,
                fileConfiguration
            );
        }

        reply.code(200).send(data[0]);
    } catch (error) {
        handleError(error, reply);
    }
};

// Function to insert a new entry
const postEntryStd = async (
    request,
    reply,
    po_Name,
    table,
    includeFiles = false
) => {
    try {
        const cleanedValues = getPostQueryValues(request.body, po_Name);
        console.log('POST ENTRY STD: ', cleanedValues);

        await client.insert({
            table,
            values: cleanedValues,
            format: 'JSONEachRow',
        });

        if (includeFiles) {
            await processFileInserts(po_Name, request.body);
        }

        reply
            .code(httpResponses.CREATED.statusCode)
            .send(httpResponses.CREATED);
    } catch (error) {
        handleError(error, reply);
    }
};

// Function to delete an entry by its ID
const deleteEntryStd = async (
    request,
    reply,
    po_Name,
    table,
    includeFiles = false
) => {
    try {
        const query = getDeleteQuery(request.params, po_Name, table);
        await client.query({ query });

        if (includeFiles) {
            await processFileDeletions(po_Name, request.params);
        }

        if (reply) {
            reply.code(httpResponses.OK.statusCode).send(httpResponses.OK);
        }
    } catch (error) {
        handleError(error, reply);
    }
};

// Export standard CRUD functions for use in other modules
module.exports = {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getFuncValueStd,
};
