'use strict';

const client = require('../../data/clickhouse');
const httpResponses = require('../../http/httpResponses');
const { BIG_MAX_LIMIT } = require('../../utilities/constants');
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
            reply
                .code(httpResponses.NOT_FOUND.statusCode)
                .send(httpResponses.NOT_FOUND);
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

const getEntryByIdStd = async (
    request,
    reply,
    po_Name,
    table,
    po_Files = null,
    table_Files = null
) => {
    try {
        const query = getSelectByIdQuery(request.params, po_Name, table);
        const rows = await client.query({ query, format: 'JSONEachRow' });
        let data = await rows.json();

        if (po_Files && table_Files) {
            const filesQuery = getSelectByIdQuery(
                request.params,
                po_Files,
                table_Files,
                BIG_MAX_LIMIT
            );
            const filesRows = await client.query({
                query: filesQuery,
                format: 'JSONEachRow',
            });
            const filesData = await filesRows.json();

            if (filesData !== null && filesData.length > 0) {
                data[0].files = filesData;
            }
        }
        console.log(data);
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

const postEntryStd = async (
    request,
    reply,
    po_Name,
    table,
    po_Files = null,
    table_Files = null
) => {
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

        if (po_Files && table_Files) {
            const filesRequestBody = request.body
                .map((object) => {
                    object.files.map((file) => {
                        file.sMa = object.sMa;
                    });
                    return object.files;
                })
                .flat();
            console.log(filesRequestBody);
            const cleanedFilesValues = getPostQueryValues(
                filesRequestBody,
                po_Files
            );
            console.log(cleanedFilesValues);
            await client.insert({
                table: table_Files,
                values: cleanedFilesValues,
                format: 'JSONEachRow',
            });
        }

        // reply.code(201).send({ message: 'Data inserted successfully' });
        if (reply) {
            reply
                .code(httpResponses.CREATED.statusCode)
                .send(httpResponses.CREATED);
        }
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
        if (reply) {
            reply.code(httpResponses.OK.statusCode).send(httpResponses.OK);
        }
    } catch (error) {
        handleError(error, reply);
    }
};

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

module.exports = {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getFuncValueStd,
};
