'use strict';

const { maxUInt64 } = require('./constants');
const { paramToCondition } = require('./conditionGenerators');
const {
    getSelectByIdAttributes,
    getAttributesByAction,
} = require('./actionGenerators');
const { cleanAndConvert } = require('./queryHelper');

// Function to generate a SELECT query from the request query parameters
const getSelectQuery = (requestQuery, paramsOperations, table) => {
    const selectAttrs = getAttributesByAction(paramsOperations, 's');
    const conditionAttrs = getAttributesByAction(paramsOperations, 'c');
    const whereConditions = generateWhereConditions(
        requestQuery,
        paramsOperations,
        conditionAttrs
    );

    const skipValue = requestQuery.skip || 0;
    const limitValue = requestQuery.limit || maxUInt64;

    const query = `SELECT ${selectAttrs} FROM ${table} WHERE 1 = 1 ${whereConditions} LIMIT ${limitValue} OFFSET ${skipValue}`;

    console.log(query);

    return query;
};

// Function to generate WHERE conditions based on request query parameters and condition attributes
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
                requestQuery
            )
        );

    return conditions.length > 0 ? `AND ${conditions.join(' ')}` : '';
};

// Function to get a real estate by its sID or other ID columns
const getSelectByIdQuery = (requestParams, paramsOperations, table, idCol) => {
    const id = String(requestParams.id);
    const selectByIdAttrs = getSelectByIdAttributes(paramsOperations);
    let query = `SELECT ${selectByIdAttrs} FROM ${table} WHERE `;

    if (idCol === 'sID') {
        query += `sID = toUUID('${id}')`;
    } else if (idCol.startsWith('i')) {
        query += `${idCol} = ${id}`;
    } else if (idCol.startsWith('s')) {
        query += `${idCol} = '${id}'`;
    }

    console.log(query);

    return query;
};

// Function to get post query values from the request body
const getPostQueryValues = (requestBody, paramsOperations) => {
    // Filter out only the attributes that are allowed to be posted (action 'p')
    const postAttrs = getAttributesByAction(paramsOperations, 'p');
    const filteredRequestBody = Object.keys(requestBody)
        .filter((attr) => postAttrs.includes(attr))
        .reduce((obj, attr) => {
            obj[attr] = requestBody[attr];
            return obj;
        }, {});

    //! Set a specific value for 'dNgayTao' attribute
    // filteredRequestBody.dNgayTao = new Date();

    // Clean and convert the filtered request body
    const cleanedRequestBody = cleanAndConvert(filteredRequestBody);

    return cleanedRequestBody;
};

// Function to get a delete query real estate by its sID or other ID columns
const getDeleteQuery = (requestParams, table, idCol) => {
    const id = String(requestParams.id);
    let query = `ALTER TABLE ${table} DELETE WHERE `;

    if (idCol === 'sID') {
        query += `sID = toUUID('${id}')`;
    } else if (idCol.startsWith('i')) {
        query += `${idCol} = ${id}`;
    } else if (idCol.startsWith('s')) {
        query += `${idCol} = '${id}'`;
    }

    console.log(query);

    return query;
};

module.exports = {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
};
