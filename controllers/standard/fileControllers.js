'use strict';

const client = require('../../data/clickhouse');
const { BIG_MAX_LIMIT } = require('../../utilities/constants');
const {
    getFileAttrs,
} = require('../../utilities/controllers/actionGenerators');
const {
    getPostQueryValues,
    getDeleteQuery,
    getSelectByIdQuery,
} = require('../../utilities/controllers/queryGenerators');

/**
 * Recycled function to process file attributes and update the data object.
 * @param {string} po_Name - The name of the table.
 * @param {Object} requestParams - The request parameters.
 * @param {Object[]} data - The data object to be updated.
 */
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

/**
 * Recycled function to process file inserts.
 * @param {string} po_Name - The name of the table.
 * @param {Object} requestBody - The request body.
 */
const processFileInserts = async (po_Name, requestBody) => {
    const fileAttrs = getFileAttrs(po_Name, 'p');

    await Promise.all(
        fileAttrs.map(async (fileAttr) => {
            const filesRequestBody = requestBody.flatMap((object) => {
                object[fileAttr.p].forEach((file) => {
                    file.sMa = object.sMa;
                });
                return object[fileAttr.p];
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

/**
 * Recycled function to process file deletions.
 * @param {string} po_Name - The name of the table.
 * @param {Object} requestParams - The request parameters.
 */
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
