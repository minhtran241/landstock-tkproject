'use strict';

/**
 * Converts a parameter and its value into a SQL condition.
 * @param {Object} po - The parameter operation object.
 * @param {Object} values - The values to use in the condition.
 * @returns {object} - An object containing the condition format and values for data binding.
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
 * @returns {object} - An object containing the condition format and values for data binding.
 */
const defaultConditionGenerator = (po, values) => {
    // use data binding to prevent SQL injection
    const paramName = `:${po.p}:${typeof values}`;
    return {
        conditionFormat: `AND ${po.p} ${po.o} ${paramName}`,
        values: { [paramName]: convertValueBasedOnType(po, values) },
    };
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
 * @returns {object} - An object containing the condition format and values for data binding.
 */
const INCondition = (pattr, values) => {
    // use data binding to prevent SQL injection
    const vps = values
        .split(',')
        .map((val, index) => `:${pattr.p}_in_${index}:${typeof val}`)
        .join(',');
    const valueParams = values.split(',').reduce((params, val, index) => {
        params[`${pattr.p}_in_${index}:${typeof val}`] =
            convertValueBasedOnType(pattr, val);
        return params;
    }, {});
    return {
        conditionFormat: `AND ${pattr.p} IN (${vps})`,
        values: valueParams,
    };
};

/**
 * Condition generator for LIKE AND conditions.
 * @param {string} attr - The parameter attribute.
 * @param {string} values - The values for the LIKE AND condition.
 * @returns {object} - An object containing the condition format and values for data binding.
 */
const LIKEANDCondition = (attr, values) => {
    // use query parameters to prevent SQL injection
    const likeConditions = values
        .split(',')
        .map(
            (val, index) => `${attr} LIKE :${attr}_like_${index}:${typeof val}`
        )
        .join(' AND ');

    const valueParams = values.split(',').reduce((params, val, index) => {
        params[`${attr}_like_${index}:${typeof val}`] = `%${val}%`;
        return params;
    }, {});

    return {
        conditionFormat: `AND ${likeConditions}`,
        values: valueParams,
    };
};

/**
 * Condition generator for BETWEEN conditions.
 * @param {string} attr - The parameter attribute.
 * @param {string} rangeString - The range string for the BETWEEN condition.
 * @returns {object|null} - An object containing the condition format and values for data binding, or null if not applicable.
 */
const BETWEENCondition = (attr, rangeString) => {
    const rangeOperations = {
        eq: {
            // equal (Ex: ?iSoTang=1)
            regex: /^\d+(\.\d+)?$|^\.\d+$/,
            fn: (match) => {
                const paramName = `:${attr}_eq:${typeof parseFloat(match[0])}`;
                return {
                    conditionFormat: `AND ${attr} = ${paramName}`,
                    values: { [paramName]: parseFloat(match[0]) },
                };
            },
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

                const valueParams = {};
                if (min) {
                    const minParamName = `:${attr}_min:${typeof min}`;
                    valueParams[minParamName] = min;
                }

                if (max) {
                    const maxParamName = `:${attr}_max:${typeof max}`;
                    valueParams[maxParamName] = max;
                }

                const minCond = min ? `${attr} ${minOp} ${minParamName}` : '';
                const maxCond = max ? `${attr} ${maxOp} ${maxParamName}` : '';

                return {
                    conditionFormat: `AND ${minCond}${
                        minCond && maxCond ? ' AND ' : ''
                    }${maxCond}`,
                    values: valueParams,
                };
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
        return val;
    } else {
        return `${val}`;
    }
};

module.exports = {
    paramToCondition,
};
