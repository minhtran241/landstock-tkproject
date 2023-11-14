'use strict';

const client = require('../../data/clickhouse');
const {
    getFileAttrs,
} = require('../../utilities/controllers/actionGenerators');
const {
    getPostQueryValues,
    getDeleteQuery,
    getSelectByIdQuery,
} = require('../../utilities/controllers/queryGenerators');

// // Function to get files data by their sMa
// const getFilesData = async (fileConfiguration, requestParams) => {
//     // Use Promise.all to perform asynchronous operations concurrently
//     const filesData = await Promise.all(
//         fileConfiguration.map(async (fileConfig) => {
//             // Generate SELECT query for files data
//             const filesQuery = getSelectByIdQuery(
//                 requestParams,
//                 fileConfig.po_Files,
//                 fileConfig.table_Files,
//                 BIG_MAX_LIMIT
//             );

//             // Execute the query and get data in JSON format
//             const filesRows = await client.query({
//                 query: filesQuery,
//                 format: 'JSONEachRow',
//             });

//             return filesRows.json(); // Return the JSON data
//         })
//     );

//     return filesData.flat(); // Flatten the array of files data
// };

// // Function to insert files data
// const insertFilesData = async (fileConfig, requestBody) => {
//     // Flatten the nested array of files from the request body
//     const filesRequestBody = requestBody.flatMap((object) => {
//         object[fileConfig.key_Files].forEach((file) => {
//             file.sMa = object.sMa; // Add additional property to each file
//         });
//         return object[fileConfig.key_Files]; // Return the flattened array of files
//     });

//     // Generate cleaned values for inserting files data
//     const cleanedFilesValues = getPostQueryValues(
//         filesRequestBody,
//         fileConfig.po_Files
//     );

//     // Insert files data into the specified table
//     await client.insert({
//         table: fileConfig.table_Files,
//         values: cleanedFilesValues,
//         format: 'JSONEachRow',
//     });
// };

// // Function to delete files data
// const deleteFilesData = async (fileConfig, requestParams) => {
//     // Generate DELETE query for files data
//     const filesQuery = getDeleteQuery(
//         requestParams,
//         fileConfig.po_Files,
//         fileConfig.table_Files
//     );

//     // Execute the DELETE query to remove files data
//     await client.query({ query: filesQuery });
// };

// Recycled function to process file attributes and update the data object
const processFileAttributes = async (po_Name, requestParams, data) => {
    const fileAttrs = getFileAttrs(po_Name, 'i');

    await Promise.all(
        fileAttrs.map(async (fileAttr) => {
            const filesQuery = getSelectByIdQuery(
                requestParams,
                fileAttr.po,
                fileAttr.tbl,
                BIG_MAX_LIMIT
            );

            const filesRows = await client.query({
                query: filesQuery,
                format: 'JSONEachRow',
            });

            const filesData = await filesRows.json();

            if (filesData !== null && filesData.length > 0) {
                data[0][fileAttr.p] = filesData;
            }
        })
    );
};

// Recycled function to process file inserts
const processFileInserts = async (po_Name, requestBody) => {
    const fileAttrs = getFileAttrs(po_Name, 'p');

    await Promise.all(
        fileAttrs.map(async (fileAttr) => {
            const filesRequestBody = requestBody.flatMap((object) => {
                object[fileAttr].forEach((file) => {
                    file.sMa = object.sMa;
                });
                return object[fileAttr];
            });

            const cleanedFilesValues = getPostQueryValues(
                filesRequestBody,
                fileAttr.po
            );

            await client.insert({
                table: fileAttr.tbl,
                values: cleanedFilesValues,
                format: 'JSONEachRow',
            });
        })
    );
};

// Recycled function to process file deletions
const processFileDeletions = async (po_Name, requestParams) => {
    const fileAttrs = getFileAttrs(po_Name, 'd');

    await Promise.all(
        fileAttrs.map(async (fileAttr) => {
            const filesQuery = getDeleteQuery(
                requestParams,
                fileAttr.po,
                fileAttr.tbl
            );

            await client.query({ query: filesQuery });
        })
    );
};

// Export functions for use in other modules
module.exports = {
    processFileAttributes,
    processFileInserts,
    processFileDeletions,
};
