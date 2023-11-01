'use strict';

// const { generateBetweenParams } = require('../stringHelper');

// Define a function to convert a parameter and its value into a SQL condition
const paramToCondition = (po, values) => {
    // Get the appropriate condition generator function or use the default
    const generateCondition =
        sqlConditionGenerators[po.o] || defaultConditionGenerator;
    return generateCondition(po, values);
};

// Default condition generator for basic conditions
const defaultConditionGenerator = (po, values) => {
    return `AND ${po.p} ${po.o} ${convertValueBasedOnType(po, values)}`;
};

// Condition generators for special conditions
const sqlConditionGenerators = {
    IN: (po, values) => INCondition(po, values),
    LIKEAND: (po, values) => LIKEANDCondition(po.p, values),
    BETWEEN: (po, values) => BETWEENCondition(po.p, values),
};

// Function generate a IN operation string of a attribute from a string
const INCondition = (pattr, values) => {
    const vps = values
        .split(',')
        .map((val) => convertValueBasedOnType(pattr, val))
        .join(',');
    return `AND ${pattr.p} IN (${vps})`;
};

// Function generate a LIKE AND operation string of a attribute from a string
const LIKEANDCondition = (attr, values) => {
    const likeConditions = values
        .split(',')
        .map((val) => `${attr} LIKE '%${val}%'`)
        .join(' AND ');
    return `AND ${likeConditions}`;
};

// Function generate a range operation string of a attribute from a range string
const BETWEENCondition = (attr, rangeString) => {
    // Check if the range is a single number
    const equalRegex = /^\d+(\.\d+)?$|^\.\d+$/;
    let match = rangeString.match(equalRegex);
    if (match) {
        const number = parseFloat(match[0]);
        return `AND ${attr} = ${number}`;
    }

    const minMaxRegex = /(\[|\(|\),\])([^,]*),([^)]*)(\[|\(|\)|\])/;
    match = rangeString.match(minMaxRegex);

    if (!match) {
        return null; // Invalid range format
    }

    const min = match[2].trim();
    const max = match[3].trim();

    if (!isNaN(min) || min === '') {
        const minOperator = match[1] === '(' || match[1] === ')' ? '>' : '>=';
        const maxOperator = match[4] === '(' || match[4] === ')' ? '<' : '<=';

        if (!isNaN(max) || max === '') {
            const minCondition =
                min === '' ? '' : `${attr} ${minOperator} ${min}`;
            const maxCondition =
                max === '' ? '' : `${attr} ${maxOperator} ${max}`;

            if (minCondition && maxCondition) {
                return `AND ${minCondition} AND ${maxCondition}`;
            } else {
                return `AND ${minCondition}${maxCondition}`;
            }
        }
    }

    return null; // Invalid min or max values

    // old code
    // {
    //     const { from, to } = generateBetweenParams(attr);
    //     if (values[from] && values[to]) {
    //         return `AND (${attr} BETWEEN ${values[from]} AND ${values[to]})`;
    //     } else if (values[from]) {
    //         return `AND (${attr} >= ${values[from]})`;
    //     } else if (values[to]) {
    //         return `AND (${attr} <= ${values[to]})`;
    //     }
    // },
};

const convertValueBasedOnType = (po, val) => {
    if (po.t === 'string') {
        return `'${val}'`;
    } else {
        return `${val}`;
    }
};

module.exports = {
    paramToCondition,
};
