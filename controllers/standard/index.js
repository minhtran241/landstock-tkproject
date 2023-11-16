'use strict';

const client = require('../../data/clickhouse');
const httpResponses = require('../../http/httpResponses');
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

/**
 * Function to handle errors.
 * @param {Error} error - The error object.
 * @param {object} reply - The Fastify reply object.
 */
function handleError(error, reply) {
    let errorRes;
    const dbErrors = ['ClickHouseSyntaxError', 'ClickHouseNetworkError'];
    if (dbErrors.includes(error.name)) {
        errorRes = httpResponses.INTERNAL_SERVER_ERROR;
    } else {
        errorRes = httpResponses.BAD_REQUEST;
    }
    console.error(error);
    reply.code(errorRes.statusCode).send(errorRes);
}

/**
 * Function to get all entries from a table.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @param {string} po_name - The name of the params operation
 * @param {string} table - The name of the table.
 */
const getAllEntriesStd = async (request, reply, po_Name, table) => {
    try {
        const { query } = getSelectQuery(request.query, po_Name, table);
        console.log('QUERY: ', query);
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

/**
 * Function to get functional values for entries.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @param {string} po_name - The name of the params operation
 * @param {string} table - The name of the table.
 */
const getFuncValueStd = async (request, reply, po_Name, table) => {
    try {
        if (!request.query.f || request.query.f === '') {
            reply
                .code(httpResponses.BAD_REQUEST.statusCode)
                .send(httpResponses.BAD_REQUEST);
        }

        const func = request.query.f.split(',')[0];
        const funcQuery = funcParamToQuery(func, request.query, po_Name, table);
        console.log('QUERY: ', funcQuery);
        const rows = await client.query({
            query: funcQuery,
            format: 'JSONEachRow',
        });
        const data = await rows.json();
        const sanitizedData = sanitizeGetFuncResponse(data, func);
        reply.code(200).send(sanitizedData);
    } catch (error) {
        if (error.name.startsWith('Invalid function')) {
            reply
                .code(httpResponses.BAD_REQUEST.statusCode)
                .send(httpResponses.BAD_REQUEST);
        } else {
            handleError(error, reply);
        }
    }
};

/**
 * Function to get an entry by its ID.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @param {string} po_name - The name of the params operation
 * @param {string} table - The name of the table.
 * @param {object} includeFiles - Process includes files or not.
 */
const getEntryByIdStd = async (
    request,
    reply,
    po_Name,
    table,
    includeFiles = false
) => {
    try {
        const query = getSelectByIdQuery(request.params, po_Name, table);
        console.log('QUERY: ', query);
        const rows = await client.query({ query, format: 'JSONEachRow' });
        let data = await rows.json();

        if (includeFiles) {
            await processFileAttributes(po_Name, request.params, data);
        }

        if (data !== null && data.length > 0) {
            reply.code(200).send(data[0]);
        } else {
            reply
                .code(httpResponses.NOT_FOUND.statusCode)
                .send(httpResponses.NOT_FOUND);
        }
    } catch (error) {
        handleError(error, reply);
    }
};

/**
 * Function to insert a new entry.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @param {string} po_name - The name of the params operation
 * @param {string} table - The name of the table.
 * @param {boolean} includeFiles - Whether to include files.
 */
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

/**
 * Function to delete an entry by its ID.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @param {string} po_name - The name of the params operation
 * @param {string} table - The name of the table.
 * @param {boolean} includeFiles - Whether to include files.
 */
const deleteEntryStd = async (
    request,
    reply,
    po_Name,
    table,
    includeFiles = false
) => {
    try {
        if (!request.params.id || request.params.id === '') {
            reply
                .code(httpResponses.BAD_REQUEST.statusCode)
                .send(httpResponses.BAD_REQUEST);
        }
        const query = getDeleteQuery(request.params, po_Name, table);
        console.log('QUERY: ', query);
        await client.query({ query });

        if (includeFiles) {
            await processFileDeletions(po_Name, request.params);
        }

        reply.code(httpResponses.OK.statusCode).send(httpResponses.OK);
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
