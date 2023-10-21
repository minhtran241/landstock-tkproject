'use strict';

const moment = require('moment');
const { generateBetweenParams } = require('./string');

// Define the maximum value for a 64-bit unsigned integer
const maxUInt64 = '18446744073709551615';

// Define a function to convert a parameter and its value into a SQL condition
const paramToCondition = (paramObject, requestValue) => {
    const { p: paramName, o: operator } = paramObject;

    // Get the appropriate condition generator function or use the default
    const generateCondition =
        sqlConditionGenerators[operator] || defaultConditionGenerator;
    return generateCondition(paramName, requestValue);
};

// Default condition generator for basic conditions
const defaultConditionGenerator = (paramName, requestValue) => {
    return `AND ${paramName} ${requestValue}`;
};

// Condition generators for special conditions
const sqlConditionGenerators = {
    IN: (paramName, requestValue) => {
        const values = requestValue
            .split(',')
            .map((val) => `'${val}'`)
            .join(',');
        return `AND ${paramName} IN (${values})`;
    },
    LIKEAND: (paramName, requestValue) => {
        const likeConditions = requestValue
            .split(',')
            .map((val) => `${paramName} LIKE '%${val}%'`)
            .join(' AND ');
        return `AND ${likeConditions}`;
    },
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

// Main function to construct the SQL query
const getSelectQuery = (requestQuery, paramsOperations, table) => {
    // Initialize the WHERE clause
    let where = '';

    if (requestQuery) {
        paramsOperations.forEach((po) => {
            let value = requestQuery[po.p];
            if (po.o === 'BETWEEN') {
                const { from, to } = generateBetweenParams(po.p);
                value = `(${from} AND ${to})`;
            }
            if (value) {
                // Use the paramToCondition function to convert the parameter and its value into a SQL condition
                where = concatWithSpace(where, paramToCondition(po, value));
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

module.exports = {
    maxUInt64,
    paramToCondition,
    removeNullValues,
    cleanAndConvert,
    getSelectQuery,
};
