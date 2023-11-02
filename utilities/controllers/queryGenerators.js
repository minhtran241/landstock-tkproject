'use strict';
const { paramToCondition } = require('./conditionGenerators');
const { getAttributesByAction, getPKAttr } = require('./actionGenerators');
const { cleanAndConvert, hasBetweenAttribute } = require('../queryHelper');
const { sanitizeLimitAndOffset } = require('./sanitization');
const { concatWithSpace } = require('../stringHelper');

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
    const { limit, skip } = sanitizeLimitAndOffset(requestQuery, table);
    const query = `SELECT ${selectAttrs} FROM ${table} WHERE 1 = 1 ${whereConditions} ${
        limit ? `LIMIT ${limit}` : ''
    } ${skip ? `OFFSET ${skip}` : ''}`;

    console.info(query);

    return { query, limit, skip };
};

// Function to generate WHERE conditions based on request query parameters and condition attributes
const generateWhereConditions = (
    requestQuery,
    paramsOperations,
    conditionAttrs
) => {
    console.log(paramsOperations.find((po) => po.p === 'iSoTang'));
    const conditions = conditionAttrs
        .filter((attr) => {
            // if (paramsOperations.find((po) => po.p === attr).o === 'BETWEEN') {
            //     return hasBetweenAttribute(requestQuery, attr);
            // }
            return requestQuery[attr] !== undefined;
        })
        .map((attr) =>
            paramToCondition(
                paramsOperations.find((po) => po.p === attr),
                requestQuery[attr]
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

    query = concatWithSpace(query, 'LIMIT 1');

    console.info(query);

    return query;
};

// Function to get post query values from the request body
const getPostQueryValues = (requestBody, paramsOperations) => {
    // Ensure requestBody is an array
    if (!Array.isArray(requestBody)) {
        requestBody = [requestBody];
    }

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

// Function to get a delete query real estate by its sID or other ID columns
const getDeleteQuery = (requestParams, paramsOperations, table) => {
    const id = String(requestParams.id);
    const pkAttr = getPKAttr(paramsOperations);
    let query = `ALTER TABLE ${table} DELETE WHERE `;
    const idCol = pkAttr.p;
    if (idCol === 'sID') {
        query += `sID = toUUID('${id}')`;
    } else if (idCol.startsWith('i')) {
        query += `${idCol} = ${id}`;
    } else if (idCol.startsWith('s')) {
        query += `${idCol} = '${id}'`;
    }

    console.info(query);

    return query;
};

const getCountQuery = (requestQuery, paramsOperations, table) => {
    const conditionAttrs = getAttributesByAction(paramsOperations, 'c');
    const whereConditions = generateWhereConditions(
        requestQuery,
        paramsOperations,
        conditionAttrs
    );

    const query = `SELECT COUNT(*) FROM ${table} WHERE 1 = 1 ${whereConditions}`;

    console.info(query);

    return query;
};

const getStatsQuery = {
    count: getCountQuery,
};

const funcParamToQuery = (func, requestQuery, paramsOperations, table) => {
    if (getStatsQuery[func]) {
        const query = getStatsQuery[func](
            requestQuery,
            paramsOperations,
            table
        );
        return query;
    } else {
        throw new Error(`Invalid function: ${f}`);
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
