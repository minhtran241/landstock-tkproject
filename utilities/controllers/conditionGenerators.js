'use strict';

/**
 * Converts a parameter and its value into a SQL condition.
 * @param {Object} po - The parameter operation object.
 * @param {Object} query_params - The query_params to use in the condition.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const paramToCondition = (po, query_params) => {
    // Get the appropriate condition generator function or use the default
    const generateCondition =
        sqlConditionGenerators[po.o] || defaultConditionGenerator;
    return generateCondition(po, query_params);
};

/**
 * Default condition generator for basic conditions.
 * @param {Object} po - The parameter operation object.
 * @param {Object} query_params - The query_params to use in the condition.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const defaultConditionGenerator = (po, query_params) => {
    const valueParams = {};
    valueParams[po.p] = convertValueBasedOnType(po, query_params);
    return {
        conditionFormat: `AND ${po.p} ${po.o} {${po.p}:${po.clht}}`,
        query_params: valueParams,
    };
};

/**
 * Object containing condition generators for each operator.
 * @type {Object}
 * @property {function} IN - IN condition generator.
 * @property {function} LIKEAND - LIKEAND condition generator.
 * @property {function} BETWEEN - BETWEEN condition generator.
 */
const sqlConditionGenerators = {
    IN: INCondition,
    LIKEAND: LIKEANDCondition,
    BETWEEN: BETWEENCondition,
};

/**
 * IN condition generator.
 * @param {Object} pattr - The parameter operation object.
 * @param {Object} query_params - The query_params to use in the condition.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const INCondition = (pattr, query_params) => {
    const vps = query_params
        .split(',')
        .map((val) => `{${pattr.p}:${pattr.clht}}`)
        .join(',');
    const valueParams = query_params.split(',').reduce((params, val) => {
        params[pattr.p] = val;
        return params;
    }, {});
    return {
        conditionFormat: `AND ${pattr.p} IN (${vps})`,
        query_params: valueParams,
    };
};

/**
 * LIKEAND condition generator.
 * @param {Object} pattr - The parameter operation object.
 * @param {Object} query_params - The query_params to use in the condition.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const LIKEANDCondition = (pattr, query_params) => {
    const likeConditions = query_params
        .split(',')
        .map((val) => `${pattr.p} LIKE %{${pattr.p}:${pattr.clht}}%`)
        .join(' AND ');
    const valueParams = query_params.split(',').reduce((params, val) => {
        params[pattr.p] = val;
        return params;
    }, {});
    return {
        conditionFormat: `AND ${likeConditions}`,
        query_params: valueParams,
    };
};

/**
 * BETWEEN condition generator.
 * @param {Object} pattr - The parameter operation object.
 * @param {Object} query_params - The query_params to use in the condition.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const BETWEENCondition = (pattr, rangeString) => {
    const rangeOperations = {
        eq: {
            regex: /^\d+(\.\d+)?$|^\.\d+$/,
            fn: (match) => {
                const paramName = `${pattr.p}:${pattr.clht}`;
                return {
                    conditionFormat: `AND ${pattr.p} = {${paramName}}`,
                    query_params: { [pattr.p]: match[0] },
                };
            },
        },
        mm: {
            regex: /(\[|\(|\),\])([^,]*),([^)]*)(\[|\(|\)|\])/,
            fn: (match) => {
                const [min, max] = [match[2].trim(), match[3].trim()];
                const [minOp, maxOp] = [
                    match[1] === '(' || match[1] === ')' ? '>' : '>=',
                    match[4] === '(' || match[4] === ')' ? '<' : '<=',
                ];

                const valueParams = {};
                const minParamName = `${pattr.p}_min:${pattr.clht}`;
                const maxParamName = `${pattr.p}_max:${pattr.clht}`;
                valueParams[minParamName.split(':')[0]] = min || null;
                valueParams[maxParamName.split(':')[0]] = max || null;

                const minCond = min
                    ? `${pattr.p} ${minOp} {${minParamName}}`
                    : '';
                const maxCond = max
                    ? `${pattr.p} ${maxOp} {${maxParamName}}`
                    : '';

                return {
                    conditionFormat: `AND ${minCond}${
                        minCond && maxCond ? ' AND ' : ''
                    }${maxCond}`,
                    query_params: valueParams,
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
 * @param {Object} val - The value to convert.
 * @returns {string} - The converted value.
 */
const convertValueBasedOnType = (po, val) =>
    po.t === 'string' ? val : `${val}`;

module.exports = {
    paramToCondition,
};
