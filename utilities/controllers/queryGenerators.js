'use strict';
const { paramToCondition } = require('./conditionGenerators');
const { getAttributesByAction, getPKAttr } = require('./actionGenerators');
const { cleanAndConvert, hasBetweenAttribute } = require('../queryHelper');
const { sanitizeLimitAndOffset } = require('./sanitization');

/**
 * Generates a SELECT query based on request query parameters.
 * @param {object} requestQuery - Request query parameters.
 * @param {Array} paramsOperations - Array of parameter operations for the table.
 * @param {string} table - Name of the table.
 * @returns {object} - An object containing the query, query_params, limit, and skip.
 */
const getSelectQuery = (requestQuery, paramsOperations, table) => {
    const selectAttrs = getAttributesByAction(paramsOperations, 's');
    const conditionAttrs = getAttributesByAction(paramsOperations, 'c');
    const { conditionFormat, query_params } = generateWhereConditions(
        requestQuery,
        paramsOperations,
        conditionAttrs
    );

    // Sanitize limit and offset query_params
    const { limit, skip } = sanitizeLimitAndOffset(requestQuery, table);
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
            ? conditions.reduce(
                  (allValues, condition) => ({
                      ...allValues,
                      ...condition.query_params,
                  }),
                  {}
              )
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
    const query = `SELECT ${selectByIdAttrs} FROM ${table} WHERE ${pkAttr.p} = {${pkAttr.p}:${pkAttr.clht}} LIMIT {limit:UInt8}`;
    const query_params = {
        limit,
        [pkAttr.p]: pkAttr.p === 'sID' ? `toUUID('${id}')` : id,
    };

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
    const cleanedObjects = requestBody.map((object) => {
        const filteredObject = Object.fromEntries(
            Object.entries(object).filter(([attr]) =>
                getAttributesByAction(paramsOperations, 'p').includes(attr)
            )
        );
        if (paramsOperations.find((po) => po.p === 'dNgayTao')) {
            filteredObject.dNgayTao = new Date();
        }
        return cleanAndConvert(filteredObject);
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
    const query = `ALTER TABLE ${table} DELETE WHERE ${idCol} = {${idCol}:${pkAttr.clht}}`;
    const query_params = {
        [idCol]: idCol === 'sID' ? `toUUID('${id}')` : id,
    };

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
    const query = `SELECT COUNT(*) FROM ${table} WHERE 1 = 1 ${conditionFormat}`;

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
        const { query, query_params } = getStatsQuery[func](
            requestQuery,
            paramsOperations,
            table
        );
        return { query, query_params };
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
