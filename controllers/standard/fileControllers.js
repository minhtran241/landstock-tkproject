// Import necessary modules and utilities
const client = require('../../data/clickhouse'); // ClickHouse client for database operations
const { BIG_MAX_LIMIT } = require('../../utilities/constants'); // Constant value for maximum limit
const {
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
} = require('../../utilities/controllers/queryGenerators'); // Utility functions for generating SQL queries

// Function to get files data by their sMa
const getFilesData = async (fileConfiguration, requestParams) => {
    // Use Promise.all to perform asynchronous operations concurrently
    const filesData = await Promise.all(
        fileConfiguration.map(async (fileConfig) => {
            // Generate SELECT query for files data
            const filesQuery = getSelectByIdQuery(
                requestParams,
                fileConfig.po_Files,
                fileConfig.table_Files,
                BIG_MAX_LIMIT
            );

            // Execute the query and get data in JSON format
            const filesRows = await client.query({
                query: filesQuery,
                format: 'JSONEachRow',
            });

            return filesRows.json(); // Return the JSON data
        })
    );

    return filesData.flat(); // Flatten the array of files data
};

// Function to insert files data
const insertFilesData = async (fileConfig, requestBody) => {
    // Flatten the nested array of files from the request body
    const filesRequestBody = requestBody.flatMap((object) => {
        object[fileConfig.key_Files].forEach((file) => {
            file.sMa = object.sMa; // Add additional property to each file
        });
        return object[fileConfig.key_Files]; // Return the flattened array of files
    });

    // Generate cleaned values for inserting files data
    const cleanedFilesValues = getPostQueryValues(
        filesRequestBody,
        fileConfig.po_Files
    );

    // Insert files data into the specified table
    await client.insert({
        table: fileConfig.table_Files,
        values: cleanedFilesValues,
        format: 'JSONEachRow',
    });
};

// Function to delete files data
const deleteFilesData = async (fileConfig, requestParams) => {
    // Generate DELETE query for files data
    const filesQuery = getDeleteQuery(
        requestParams,
        fileConfig.po_Files,
        fileConfig.table_Files
    );

    // Execute the DELETE query to remove files data
    await client.query({ query: filesQuery });
};

// Export functions for use in other modules
module.exports = {
    getFilesData,
    insertFilesData,
    deleteFilesData,
};
