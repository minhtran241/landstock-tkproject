'use strict';

const moment = require('moment');

// Define the maximum value for a 64-bit unsigned integer
const maxUInt64 = '18446744073709551615';

// Define a function to convert a parameter and its value into a SQL condition
const paramToCondition = (paramObject, requestValue) => {
    const { p: paramName, o: operator } = paramObject;
    let modifiedParamName = paramName;

    // If the operator is greater than or equal to or smaller than or equal to, remove 'Tu' or 'Den' prefix
    if (['>=', '<='].includes(operator)) {
        modifiedParamName = paramName.replace(/Tu|Den/, '');
    }

    // Get the appropriate condition generator function or use the default
    const generateCondition =
        sqlConditionGenerators[operator] || defaultConditionGenerator;
    return generateCondition(modifiedParamName, requestValue);
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

module.exports = {
    maxUInt64,
    paramToCondition,
    removeNullValues,
    cleanAndConvert,
};
