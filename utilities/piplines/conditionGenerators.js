'use strict';

const { generateBetweenParams } = require('../stringHelper');

// Define a function to convert a parameter and its value into a SQL condition
const paramToCondition = (po, values) => {
    // Get the appropriate condition generator function or use the default
    const generateCondition =
        sqlConditionGenerators[po.o] || defaultConditionGenerator;
    return generateCondition(po, values);
};

// Default condition generator for basic conditions
const defaultConditionGenerator = (po, values) => {
    return `AND ${po.p} ${po.o} ${convertValueBasedOnType(po, values[po.p])}`;
};

// Condition generators for special conditions
const sqlConditionGenerators = {
    // EQUAL: (po, values) =>
    //     `AND ${po.p} = ${convertValueBasedOnType(po, values[po.p])}`,
    IN: (po, values) => {
        const vps = values[po.p]
            .split(',')
            .map((val) => convertValueBasedOnType(po, val))
            .join(',');
        return `AND ${po.p} IN (${vps})`;
    },
    LIKEAND: (po, values) => {
        const likeConditions = values[po.p]
            .split(',')
            .map((val) => `${po.p} LIKE '%${val}%'`)
            .join(' AND ');
        return `AND ${likeConditions}`;
    },
    BETWEEN: (po, values) => {
        const { from, to } = generateBetweenParams(po.p);
        if (values[from] && values[to]) {
            return `AND (${po.p} BETWEEN ${values[from]} AND ${values[to]})`;
        } else if (values[from]) {
            return `AND (${po.p} >= ${values[from]})`;
        } else if (values[to]) {
            return `AND (${po.p} <= ${values[to]})`;
        }
    },
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
