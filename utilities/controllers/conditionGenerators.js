'use strict';

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
 * Substring position condition generator.
 * @param {Object} pattr - The parameter operation object.
 * @param {string} query_params - The query_params to use in the condition.
 * @returns {object} - An object containing the condition format and query_params for data binding.
 */
const SubstringCondition = (pattr, query_params) => {
    const pattern = /^[\(\[]([^,\)\]]+(, ?[^,\)\]]+)*)[\)\]]$/; // Ex: [A,B,C] or (A,B,C)

    // Test if the query_params matches the pattern
    if (!pattern.test(query_params)) {
        throw new Error(`Invalid format for query_params: ${query_params}`);
    }

    const isAndOperation = query_params.startsWith('[');
    const operation = isAndOperation ? 'AND' : 'OR';

    // if (isAndOperation || query_params.startsWith('(')) {
    const values = query_params.slice(1, -1).split(',');

    const conditions = values.map((val, index) => {
        const paramName = `${pattr.p}_${index}`;
        return `position(${pattr.p}, {${paramName}:${pattr.clht}}) > 0`;
    });

    const conditionFormat = `${operation} ${conditions.join(` ${operation} `)}`;

    const query_params_binding = values.reduce((params, val, index) => {
        params[`${pattr.p}_${index}`] = val;
        return params;
    }, {});

    return {
        conditionFormat,
        query_params: query_params_binding,
    };
    // }
};

// Example usage
try {
    const result = SubstringCondition(
        { p: 'sLoaiHang', clht: 'utf8' },
        '[A,B,C]'
    );
    console.log(result.conditionFormat);
    console.log(result.query_params);
} catch (error) {
    console.error(error.message);
}

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
 * Object containing condition generators for each operator.
 * @type {Object}
 * @property {function} IN - IN condition generator.
 * @property {function} LIKEAND - LIKEAND condition generator.
 * @property {function} BETWEEN - BETWEEN condition generator.
 */
const sqlConditionGenerators = {
    IN: INCondition,
    // LIKEAND: LIKEANDCondition,
    BETWEEN: BETWEENCondition,
    SUBSTRING: SubstringCondition,
};

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
