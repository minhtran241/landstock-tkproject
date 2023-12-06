'use strict';
const { paramToCondition } = require('./conditionGenerators');
const { getAttributesByAction, getPKAttr } = require('./actionGenerators');
const { cleanAndConvert, hasBetweenAttribute } = require('../queryHelper');
const { sanitizeLimitAndOffset } = require('./sanitization');
const { concatWithSpace } = require('../stringHelper');

/**
 * Generates a SELECT query from the request query parameters.
 *
 * @param {object} requestQuery - Request query parameters.
 * @param {Array} paramsOperations - Array of parameter operations for the table.
 * @param {string} table - Name of the table.
 * @returns {object} - The generated SELECT query, limit, and offset.
 */
const getSelectQuery = (requestQuery, paramsOperations, table) => {
    const selectAttrs = getAttributesByAction(paramsOperations, 's');
    const conditionAttrs = getAttributesByAction(paramsOperations, 'c');
    let { conditionFormat, query_params } = generateWhereConditions(
        requestQuery,
        paramsOperations,
        conditionAttrs
    );

    // Sanitize limit and offset query_params
    const { limit, skip } = sanitizeLimitAndOffset(requestQuery, table);
    query_params = { ...query_params, limit, skip };

    const query = `SELECT ${selectAttrs} FROM ${table} WHERE 1 = 1 ${conditionFormat} ${
        limit ? `LIMIT {limit:UInt8}` : ''
    } ${skip ? `OFFSET {skip:UInt8}` : ''}`;

    return { query, query_params, limit, skip };
};

/**
 * Generates WHERE conditions based on request query parameters and condition attributes.
 *
 * @param {object} requestQuery - Request query parameters.
 * @param {Array} paramsOperations - Array of parameter operations for the table.
 * @param {Array} conditionAttrs - Array of condition attributes.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const generateWhereConditions = (
    requestQuery,
    paramsOperations,
    conditionAttrs
) => {
    const conditions = conditionAttrs
        .filter((attr) => requestQuery[attr] !== undefined)
        .map((attr) =>
            paramToCondition(
                paramsOperations.find((po) => po.p === attr),
                requestQuery[attr]
            )
        );

    const conditionFormat =
        conditions.length > 0
            ? conditions.map((condition) => condition.conditionFormat).join(' ')
            : '';
    const query_params =
        conditions.length > 0
            ? conditions.reduce((allValues, condition) => {
                  Object.assign(allValues, condition.query_params);
                  return allValues;
              }, {})
            : {};

    return { conditionFormat, query_params };
};

/**
 * Generates a SELECT query to retrieve an entry by its primary key (sID or other ID columns).
 *
 * @param {object} requestParams - Request parameters.
 * @param {Array} paramsOperations - Array of parameter operations for the table.
 * @param {string} table - Name of the table.
 * @param {number} [limit=1] - Limit the number of results (default is 1).
 * @returns {string} - The generated SELECT query.
 */
const getSelectByIdQuery = (
    requestParams,
    paramsOperations,
    table,
    limit = 1
) => {
    const id = String(requestParams.id);
    const selectByIdAttrs = getAttributesByAction(paramsOperations, 'i');
    const pkAttr = getPKAttr(paramsOperations);
    let query = `SELECT ${selectByIdAttrs} FROM ${table} WHERE ${pkAttr.p} = {${pkAttr.p}:${pkAttr.clht}} LIMIT {limit:UInt8}`;
    let query_params = {
        limit: limit,
    };

    if (pkAttr.p === 'sID') {
        // query += ` toUUID('${id}')`;
        query_params[pkAttr.p] = `toUUID('${id}')`;
    } else {
        query_params[pkAttr.p] = id;
    }

    // if (pkAttr.p === 'sID') {
    //     query += `sID = toUUID('${id}')`;
    // } else if (pkAttr.t === 'number') {
    //     query += `${pkAttr.p} = ${id}`;
    // } else if (pkAttr.t === 'string') {
    //     query += `${pkAttr.p} = '${id}'`;
    // }

    // query = concatWithSpace(query, `LIMIT ${limit}`);

    // console.info(query);

    return { query, query_params };
};

/**
 * Gets the query_params for a post query from the request body.
 *
 * @param {Array} requestBody - Request body containing objects to post.
 * @param {Array} paramsOperations - Array of parameter operations for the table.
 * @returns {Array} - Cleaned and processed objects for the post query.
 */
const getPostQueryValues = (requestBody, paramsOperations) => {
    // Initialize an array to store cleaned and processed objects
    const cleanedObjects = [];
    // Filter out only the attributes that are allowed to be posted (action 'p')
    const postAttrs = getAttributesByAction(paramsOperations, 'p');

    requestBody.forEach((object) => {
        const filteredObject = Object.keys(object)
            .filter((attr) => postAttrs.includes(attr))
            .reduce((obj, attr) => {
                obj[attr] = object[attr];
                return obj;
            }, {});
        // Set a specific value for 'dNgayTao' attribute
        if (paramsOperations.find((po) => po.p === 'dNgayTao') !== undefined) {
            filteredObject.dNgayTao = new Date();
        }

        // Clean and convert the filtered object
        const cleanedObject = cleanAndConvert(filteredObject);

        cleanedObjects.push(cleanedObject);
    });

    return cleanedObjects;
};

/**
 * Generates a delete query for a real estate entry based on its sID or other ID columns.
 *
 * @param {object} requestParams - Request parameters.
 * @param {Array} paramsOperations - Array of parameter operations for the table.
 * @param {string} table - Name of the table.
 * @returns {string} - The generated DELETE query.
 */
const getDeleteQuery = (requestParams, paramsOperations, table) => {
    const id = String(requestParams.id);
    const pkAttr = getPKAttr(paramsOperations);
    const idCol = pkAttr.p;
    let query = `ALTER TABLE ${table} DELETE WHERE ${idCol} = {${idCol}:${pkAttr.clht}}`;
    let query_params = {};
    if (idCol === 'sID') {
        query_params[idCol] = `toUUID('${id}')`;
        // query += `sID = toUUID('${id}')`;
    } else {
        query_params[idCol] = id;
        // query += `${idCol} = ${id}`;
    }

    // console.info(query);

    return { query, query_params };
};

/**
 * Generates a COUNT query based on request query parameters.
 *
 * @param {object} requestQuery - Request query parameters.
 * @param {Array} paramsOperations - Array of parameter operations for the table.
 * @param {string} table - Name of the table.
 * @returns {string} - The generated COUNT query.
 */
const getCountQuery = (requestQuery, paramsOperations, table) => {
    const conditionAttrs = getAttributesByAction(paramsOperations, 'c');
    const { conditionFormat, query_params } = generateWhereConditions(
        requestQuery,
        paramsOperations,
        conditionAttrs
    );

    // const query = `SELECT COUNT(*) FROM ${table} WHERE 1 = 1 ${whereConditions}`;
    const query = `SELECT COUNT(*) FROM ${table} WHERE 1 = 1 ${conditionFormat}`;

    // console.info(query);

    return { query, query_params };
};

/**
 * Object containing functions to generate various statistical queries.
 * @namespace
 */
const getStatsQuery = {
    count: getCountQuery,
};

/**
 * Converts a statistical function and its parameters into a corresponding query.
 *
 * @param {string} func - The statistical function to perform (e.g., 'count').
 * @param {object} requestQuery - Request query parameters.
 * @param {Array} paramsOperations - Array of parameter operations for the table.
 * @param {string} table - Name of the table.
 * @returns {string} - The generated statistical query.
 * @throws {Error} - If an invalid function is provided.
 */
const funcParamToQuery = (func, requestQuery, paramsOperations, table) => {
    if (getStatsQuery[func]) {
        const query = getStatsQuery[func](
            requestQuery,
            paramsOperations,
            table
        );
        return query;
    } else {
        throw new Error(`Invalid function: ${func}`);
    }
};

module.exports = {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
    getStatsQuery,
    funcParamToQuery,
};
