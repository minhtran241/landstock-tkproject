'use strict';

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
        if (obj[key] === null || obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}

module.exports = {
    maxUInt64,
    paramToCondition,
    removeNullValues,
};
