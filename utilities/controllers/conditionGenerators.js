'use strict';

/**
 * Converts a parameter and its value into a SQL condition.
 * @param {Object} po - The parameter operation object.
 * @param {Object} values - The values to use in the condition.
 * @returns {string} - The generated SQL condition.
 */
const paramToCondition = (po, values) => {
    // Get the appropriate condition generator function or use the default
    const generateCondition =
        sqlConditionGenerators[po.o] || defaultConditionGenerator;
    return generateCondition(po, values);
};

/**
 * Default condition generator for basic conditions.
 * @param {Object} po - The parameter operation object.
 * @param {Object} values - The values to use in the condition.
 * @returns {string} - The default SQL condition.
 */
const defaultConditionGenerator = (po, values) => {
    return `AND ${po.p} ${po.o} ${convertValueBasedOnType(po, values)}`;
};

/**
 * Condition generators for special conditions.
 */
const sqlConditionGenerators = {
    IN: (po, values) => INCondition(po, values),
    LIKEAND: (po, values) => LIKEANDCondition(po.p, values),
    BETWEEN: (po, values) => BETWEENCondition(po.p, values),
};

/**
 * Condition generator for IN conditions.
 * @param {Object} pattr - The parameter attribute object.
 * @param {string} values - The values for the IN condition.
 * @returns {string} - The generated SQL condition.
 */
const INCondition = (pattr, values) => {
    const vps = values
        .split(',')
        .map((val) => convertValueBasedOnType(pattr, val))
        .join(',');
    return `AND ${pattr.p} IN (${vps})`;
};

/**
 * Condition generator for LIKE AND conditions.
 * @param {string} attr - The parameter attribute.
 * @param {string} values - The values for the LIKE AND condition.
 * @returns {string} - The generated SQL condition.
 */
const LIKEANDCondition = (attr, values) => {
    const likeConditions = values
        .split(',')
        .map((val) => `${attr} LIKE '%${val}%'`)
        .join(' AND ');
    return `AND ${likeConditions}`;
};

/**
 * Condition generator for BETWEEN conditions.
 * @param {string} attr - The parameter attribute.
 * @param {string} rangeString - The range string for the BETWEEN condition.
 * @returns {string|null} - The generated SQL condition or null if not applicable.
 */
const BETWEENCondition = (attr, rangeString) => {
    const rangeOperations = {
        eq: {
            // equal (Ex: ?iSoTang=1)
            regex: /^\d+(\.\d+)?$|^\.\d+$/,
            fn: (match) => `AND ${attr} = ${parseFloat(match[0])}`,
        },
        mm: {
            // min max (Ex: ?iSoTang=[1,2], ?iSoTang=(1,2], ?iSoTang=[1,2), ?iSoTang=(1,2))
            regex: /(\[|\(|\),\])([^,]*),([^)]*)(\[|\(|\)|\])/,
            fn: (match) => {
                const [min, max] = [match[2].trim(), match[3].trim()];
                const [minOp, maxOp] = [
                    match[1] === '(' || match[1] === ')' ? '>' : '>=',
                    match[4] === '(' || match[4] === ')' ? '<' : '<=',
                ];
                const minCond = min ? `${attr} ${minOp} ${min}` : '';
                const maxCond = max ? `${attr} ${maxOp} ${max}` : '';
                return `AND ${minCond}${
                    minCond && maxCond ? ' AND ' : ''
                }${maxCond}`;
            },
        },
    };

    for (const key in rangeOperations) {
        const { regex, fn } = rangeOperations[key];
        const match = rangeString.match(regex);
        if (match) {
            return fn(match);
        }
    }
    return null;
};

/**
 * Converts a value based on its type.
 * @param {Object} po - The parameter operation object.
 * @param {string} val - The value to convert.
 * @returns {string} - The converted value.
 */
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
