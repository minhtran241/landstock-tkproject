'use strict';

const { concatWithSpace, generateBetweenParams } = require('./string');
const { maxUInt64 } = require('./constants');
const { paramToCondition } = require('./conditionGenerators');
const {
    getSelectAttributes,
    getSelectByIdAttributes,
} = require('./actionGenerators');

// Function to generate a SELECT query from the request query parameters
const getSelectQuery = (requestQuery, paramsOperations, table) => {
    // Initialize the WHERE clause
    let where = '';

    if (requestQuery) {
        paramsOperations.forEach((po) => {
            const { from, to } = generateBetweenParams(po.p);
            if (requestQuery[po.p] || requestQuery[from] || requestQuery[to]) {
                // Use the paramToCondition function to convert the parameter and its value into a SQL condition
                where = concatWithSpace(
                    where,
                    paramToCondition(po, requestQuery)
                );
            }
        });
    }

    // Add the LIMIT and OFFSET clauses
    const { skip, limit } = requestQuery;
    const skipValue = skip || 0;
    const limitValue = limit || maxUInt64;

    // Construct the final SQL query
    const query = `SELECT ${getSelectAttributes(
        paramsOperations
    )} FROM ${table} WHERE 1 = 1 ${where} LIMIT ${limitValue} OFFSET ${skipValue}`;

    return query;
};

// Function to get a real estate by its sID
const getSelectByIdQuery = (requestParams, paramsOperations, table, idCol) => {
    let { id } = requestParams;
    id = String(id);
    let query = '';
    const attrs = getSelectByIdAttributes(paramsOperations);
    if (idCol === 'sID') {
        query = `SELECT ${attrs} FROM ${table} WHERE sID = toUUID('${id}')`;
    } else if (idCol.startWith('i')) {
        query = `SELECT ${attrs} FROM ${table} WHERE ${idCol} = ${id}`;
    } else if (idCol.startWith('s')) {
        query = `SELECT ${attrs} FROM ${table} WHERE ${idCol} = '${id}'`;
    }
    console.log(query);
    return String(query);
};

module.exports = {
    getSelectQuery,
    getSelectByIdQuery,
};
