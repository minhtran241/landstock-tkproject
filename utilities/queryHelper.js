'use strict';

const moment = require('moment');
const { concatWithSpace, generateBetweenParams } = require('./string');

// Define the maximum value for a 64-bit unsigned integer
const maxUInt64 = '18446744073709551615';

// Define a function to convert a parameter and its value into a SQL condition
const paramToCondition = (paramObject, requestQuery) => {
    const { p: paramName, o: operator } = paramObject;

    // Get the appropriate condition generator function or use the default
    const generateCondition =
        sqlConditionGenerators[operator] || defaultConditionGenerator;
    return generateCondition(paramObject, requestQuery);
};

// Default condition generator for basic conditions
const defaultConditionGenerator = (paramObject, requestQuery) => {
    return `AND ${paramObject.p} ${paramObject.o} ${
        requestQuery[paramObject.p]
    }`;
};

// Condition generators for special conditions
const sqlConditionGenerators = {
    IN: (paramObject, requestValue) => {
        const values = requestValue[paramObject.p]
            .split(',')
            .map((val) => `'${val}'`)
            .join(',');
        return `AND ${paramObject.p} IN (${values})`;
    },
    LIKEAND: (paramObject, requestValue) => {
        const likeConditions = requestValue[paramObject.p]
            .split(',')
            .map((val) => `${paramObject.p} LIKE '%${val}%'`)
            .join(' AND ');
        return `AND ${likeConditions}`;
    },
    BETWEEN: (paramObject, requestValue) => {
        const { from, to } = generateBetweenParams(paramObject.p);
        return `AND ${paramObject.p} BETWEEN ${requestValue[from]} AND ${requestValue[to]}`;
    },
};

// Main function to construct the SQL query
const getSelectQuery = (requestQuery, paramsOperations, table) => {
    // Initialize the WHERE clause
    let where = '';

    if (requestQuery) {
        paramsOperations.forEach((po) => {
            if (requestQuery[po.p] || generateBetweenParams(po.p)) {
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

// Function to remove null or undefined values from an object
function removeNullValues(obj) {
    for (const key in obj) {
        if (
            obj[key] === null ||
            obj[key] === undefined ||
            obj[key] === '' ||
            obj[key] === 'null'
        ) {
            delete obj[key];
        }
    }
    return obj;
}

// Function to clean and convert values
function cleanAndConvert(values) {
    const cleanedValues = {};
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            if (
                values[key] !== null ||
                values[key] !== undefined ||
                values[key] !== '' ||
                values[key] !== 'null'
            ) {
                if (key.startsWith('i') || key.startsWith('f')) {
                    // Convert numeric attributes to numbers
                    cleanedValues[key] = Number(values[key]);
                } else if (key.startsWith('s') && key.endsWith('s')) {
                    // Convert string array attributes to string arrays. Example: sFiles
                    cleanedValues[key] = values[key].split(',');
                } else if (key.startsWith('s')) {
                    // Convert string attributes to strings
                    cleanedValues[key] = String(values[key]);
                } else if (key.startsWith('b')) {
                    // Convert boolean attributes to boolean
                    cleanedValues[key] = Boolean(values[key]);
                } else if (key.startsWith('d')) {
                    // Convert date attributes to date
                    cleanedValues[key] = moment(values[key]).format(
                        'YYYY-MM-DD HH:mm:ss'
                    );
                } else {
                    // Keep other attributes as-is
                    cleanedValues[key] = values[key];
                }
            }
        }
    }
    return cleanedValues;
}

const getSelectAttributes = (paramsOperations) => {
    const selectAttributes = [];
    paramsOperations.forEach((po) => {
        if (po.a.includes('s')) {
            selectAttributes.push(po.p);
        }
    });
    return selectAttributes;
};

module.exports = {
    maxUInt64,
    paramToCondition,
    removeNullValues,
    cleanAndConvert,
    getSelectQuery,
};
