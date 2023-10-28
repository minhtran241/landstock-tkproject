'use strict';
const { getStatsQuery } = require('./piplines/queryGenerators');

const funcParamToQuery = (func, requestQuery, paramsOperations, table) => {
    if (getStatsQuery[func]) {
        const query = getStatsQuery[func](
            requestQuery,
            paramsOperations,
            table
        );
        return query;
    } else {
        throw new Error(`Invalid function: ${f}`);
    }
};

module.exports = {
    funcParamToQuery,
};
