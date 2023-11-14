'use strict'; // Enable strict mode for better error handling

const client = require('../../data/clickhouse'); // ClickHouse client for database operations
const httpResponses = require('../../http/httpResponses'); // HTTP response constants
const {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
    funcParamToQuery,
} = require('../../utilities/controllers/queryGenerators'); // Utility functions for generating SQL queries
const {
    sanitizeGetFuncResponse,
} = require('../../utilities/controllers/sanitization'); // Utility function for sanitizing GET function responses
const {
    getFilesData,
    insertFilesData,
    deleteFilesData,
} = require('./fileControllers'); // File-related utility functions

// Function to handle errors
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

// Function to get all entries from a table
const getAllEntriesStd = async (request, reply, po_Name, table) => {
    try {
        // Generate SELECT query based on request parameters
        const { query } = getSelectQuery(request.query, po_Name, table);

        // Execute the query and get data in JSON format
        const rows = await client.query({
            query,
            format: 'JSONEachRow',
        });
        let data = await rows.json();

        // Check if data exists and send appropriate response
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
        // Check if the query parameter 'f' is present
        if (!request.query.f) {
            throw new Error('No function specified');
        }

        // Extract the first function from the 'f' parameter
        const func = request.query.f.split(',')[0];

        // Generate a query for the specified function
        const funcQuery = funcParamToQuery(func, request.query, po_Name, table);

        // Execute the query and get data in JSON format
        const rows = await client.query({
            query: funcQuery,
            format: 'JSONEachRow',
        });

        // Get data and sanitize the response based on the function
        const data = await rows.json();
        const sanitizedData = sanitizeGetFuncResponse(data, func);

        // Send the sanitized data as a response
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
        // Generate SELECT query for the specified entry ID
        const query = getSelectByIdQuery(request.params, po_Name, table);

        // Execute the query and get data in JSON format
        const rows = await client.query({ query, format: 'JSONEachRow' });
        let data = await rows.json();

        // Check if file configuration is provided
        if (fileConfiguration) {
            // Get files data for the specified configuration and parameters
            const filesData = await getFilesData(
                fileConfiguration,
                request.params
            );

            // Check if files data exists and attach it to the entry
            if (filesData !== null && filesData.length > 0) {
                data[0].files = filesData;
            }
        }

        // Send the entry data as a response
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
    fileConfiguration = null
) => {
    try {
        // Generate cleaned values for inserting the new entry
        const cleanedValues = getPostQueryValues(request.body, po_Name);
        console.log('POST ENTRY STD: ', cleanedValues);

        // Insert the new entry into the specified table
        await client.insert({
            table,
            values: cleanedValues,
            format: 'JSONEachRow',
        });

        // Check if file configuration is provided
        if (fileConfiguration) {
            // Insert files data for the specified configuration and request body
            await Promise.all(
                fileConfiguration.map(async (fileConfig) => {
                    await insertFilesData(fileConfig, request.body);
                })
            );
        }

        // Send a successful response
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
    fileConfiguration = null
) => {
    try {
        // Generate DELETE query for the specified entry ID
        const query = getDeleteQuery(request.params, po_Name, table);

        // Execute the DELETE query
        await client.query({ query });

        // Check if file configuration is provided
        if (fileConfiguration) {
            // Delete files data for the specified configuration and parameters
            await Promise.all(
                fileConfiguration.map(async (fileConfig) => {
                    await deleteFilesData(fileConfig, request.params);
                })
            );
        }

        // Send a successful response if a reply object is provided
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
