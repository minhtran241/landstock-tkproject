'use strict';

const { paramToCondition } = require('./conditionGenerators');
const { getAttributesByAction, getPKAttr } = require('./actionGenerators');
const { cleanAndConvert, sanitizeLimitAndOffset } = require('../queryHelper');

// Function to generate a SELECT query from the request query parameters
const getSelectQuery = (requestQuery, paramsOperations, table) => {
    const selectAttrs = getAttributesByAction(paramsOperations, 's');
    const conditionAttrs = getAttributesByAction(paramsOperations, 'c');
    const whereConditions = generateWhereConditions(
        requestQuery,
        paramsOperations,
        conditionAttrs
    );

    // Sanitize limit and offset values
    const { limit, skip } = sanitizeLimitAndOffset(requestQuery);

    const query = `SELECT ${selectAttrs} FROM ${table} WHERE 1 = 1 ${whereConditions} LIMIT ${limit} OFFSET ${skip}`;

    console.info(query);

    return { query, limit, skip };
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

    return conditions.length > 0 ? ` ${conditions.join(' ')}` : '';
};

// Function to get a real estate by its sID or other ID columns
const getSelectByIdQuery = (requestParams, paramsOperations, table) => {
    const id = String(requestParams.id);
    const selectByIdAttrs = getAttributesByAction(paramsOperations, 'i');
    const pkAttr = getPKAttr(paramsOperations);
    let query = `SELECT ${selectByIdAttrs} FROM ${table} WHERE `;

    if (pkAttr.p === 'sID') {
        query += `sID = toUUID('${id}')`;
    } else if (pkAttr.t === 'number') {
        query += `${pkAttr.p} = ${id}`;
    } else if (pkAttr.t === 'string') {
        query += `${pkAttr.p} = '${id}'`;
    }

    console.info(query);

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

    // Set a specific value for 'dNgayTao' attribute
    if (paramsOperations.find((po) => po.p === 'dNgayTao') !== undefined) {
        filteredRequestBody.dNgayTao = new Date();
    }

    // Clean and convert the filtered request body
    const cleanedRequestBody = cleanAndConvert(filteredRequestBody);

    return cleanedRequestBody;
};

// Function to get a delete query real estate by its sID or other ID columns
const getDeleteQuery = (requestParams, paramsOperations, table) => {
    const id = String(requestParams.id);
    const pkAttr = getPKAttr(paramsOperations);
    let query = `ALTER TABLE ${table} DELETE WHERE `;

    if (pkAttr.p === 'sID') {
        query += `sID = toUUID('${id}')`;
    } else if (idCol.startsWith('i')) {
        query += `${pkAttr.p} = ${id}`;
    } else if (idCol.startsWith('s')) {
        query += `${pkAttr.p} = '${id}'`;
    }

    console.info(query);

    return query;
};

module.exports = {
    getSelectQuery,
    getSelectByIdQuery,
    getPostQueryValues,
    getDeleteQuery,
};
