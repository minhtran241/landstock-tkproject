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
    fileConfiguration = null
) => {
    try {
        const query = getSelectByIdQuery(request.params, po_Name, table);
        const rows = await client.query({ query, format: 'JSONEachRow' });
        let data = await rows.json();

        if (fileConfiguration) {
            const filesData = await getFilesData(
                fileConfiguration,
                request.params
            );

            if (filesData !== null && filesData.length > 0) {
                data[0].files = filesData;
            }
        }

        reply.code(200).send(data[0]);
    } catch (error) {
        handleError(error, reply);
    }
};

const postEntryStd = async (
    request,
    reply,
    po_Name,
    table,
    fileConfiguration = null
) => {
    try {
        const cleanedValues = getPostQueryValues(request.body, po_Name);
        console.log('POST ENTRY STD: ', cleanedValues);

        await client.insert({
            table,
            values: cleanedValues,
            format: 'JSONEachRow',
        });

        if (fileConfiguration) {
            await Promise.all(
                fileConfiguration.map(async (fileConfig) => {
                    await insertFilesData(fileConfig, request.body);
                })
            );
        }

        reply
            .code(httpResponses.CREATED.statusCode)
            .send(httpResponses.CREATED);
    } catch (error) {
        handleError(error, reply);
    }
};

const deleteEntryStd = async (
    request,
    reply,
    po_Name,
    table,
    fileConfiguration = null
) => {
    try {
        const query = getDeleteQuery(request.params, po_Name, table);
        await client.query({ query });

        if (fileConfiguration) {
            await Promise.all(
                fileConfiguration.map(async (fileConfig) => {
                    await deleteFilesData(fileConfig, request.params);
                })
            );
        }

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

const getFilesData = async (fileConfiguration, requestParams) => {
    const filesData = await Promise.all(
        fileConfiguration.map(async (fileConfig) => {
            const filesQuery = getSelectByIdQuery(
                requestParams,
                fileConfig.po_Files,
                fileConfig.table_Files,
                BIG_MAX_LIMIT
            );

            const filesRows = await client.query({
                query: filesQuery,
                format: 'JSONEachRow',
            });

            return filesRows.json();
        })
    );

    return filesData.flat();
};

const insertFilesData = async (fileConfig, requestBody) => {
    const filesRequestBody = requestBody.flatMap((object) => {
        object[fileConfig.key_Files].forEach((file) => {
            file.sMa = object.sMa;
        });
        return object[fileConfig.key_Files];
    });

    const cleanedFilesValues = getPostQueryValues(
        filesRequestBody,
        fileConfig.po_Files
    );

    await client.insert({
        table: fileConfig.table_Files,
        values: cleanedFilesValues,
        format: 'JSONEachRow',
    });
};

const deleteFilesData = async (fileConfig, requestParams) => {
    const filesQuery = getDeleteQuery(
        requestParams,
        fileConfig.po_Files,
        fileConfig.table_Files
    );
    await client.query({ query: filesQuery });
};

module.exports = {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
    getFuncValueStd,
};
