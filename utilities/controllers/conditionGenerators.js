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
    return {
        conditionFormat: `AND ${po.p} ${po.o} ${paramName}`,
        query_params: { [po.p]: convertValueBasedOnType(po, query_params) },
    };
};

/**
 * Condition generators for special conditions.
 */
const sqlConditionGenerators = {
    IN: (po, query_params) => INCondition(po, query_params),
    LIKEAND: (po, query_params) => LIKEANDCondition(po, query_params),
    BETWEEN: (po, query_params) => BETWEENCondition(po, query_params),
};

/**
 * Condition generator for IN conditions.
 * @param {Object} pattr - The parameter attribute object.
 * @param {string} query_params - The query_params for the IN condition.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const INCondition = (pattr, query_params) => {
    // use data binding to prevent SQL injection
    const vps = query_params
        .split(',')
        .map((val, index) => `{${pattr.p}:${pattr.clht}}`)
        .join(',');
    const valueParams = query_params.split(',').reduce((params, val, index) => {
        params[pattr.p] = val;
        return params;
    }, {});
    return {
        conditionFormat: `AND ${pattr.p} IN (${vps})`,
        query_params: valueParams,
    };
};

/**
 * Condition generator for LIKE AND conditions.
 * @param {string} attr - The parameter attribute.
 * @param {string} query_params - The query_params for the LIKE AND condition.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const LIKEANDCondition = (pattr, query_params) => {
    // use query parameters to prevent SQL injection
    const likeConditions = query_params
        .split(',')
        .map((val, index) => `${pattr.p} LIKE %{${pattr.p}:${pattr.clht}}%`)
        .join(' AND ');

    const valueParams = query_params.split(',').reduce((params, val, index) => {
        params[pattr.p] = val;
        return params;
    }, {});

    return {
        conditionFormat: `AND ${likeConditions}`,
        query_params: valueParams,
    };
};

/**
 * Condition generator for BETWEEN conditions.
 * @param {string} attr - The parameter attribute.
 * @param {string} rangeString - The range string for the BETWEEN condition.
 * @returns {object|null} - An object containing the condition format and query_params for data binding, or null if not applicable.
 */
const BETWEENCondition = (pattr, rangeString) => {
    const rangeOperations = {
        eq: {
            // equal (Ex: ?iSoTang=1)
            regex: /^\d+(\.\d+)?$|^\.\d+$/,
            fn: (match) => {
                // match[0] = 1
                const paramName = `${pattr.p}:${pattr.clht}`;
                return {
                    conditionFormat: `AND ${pattr.p} = {${paramName}}`,
                    query_params: { [pattr.p]: match[0] },
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
                const minParamName = min ? `${pattr.p}:${pattr.clht}` : '';
                const maxParamName = max ? `${pattr.p}:${pattr.clht}` : '';
                valueParams[minParamName] = min ? min : '';
                valueParams[maxParamName] = max ? max : '';
                // if (min) {
                //     const minParamName = `${pattr.p}:${pattr.clht}`;
                //     valueParams[minParamName] = min;
                // }

                // if (max) {
                //     const maxParamName = `${pattr.p}:${pattr.clht}`;
                //     valueParams[maxParamName] = max;
                // }

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
