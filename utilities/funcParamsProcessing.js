'use strict';

const { getStatsQuery } = require('./piplines/queryGenerators');

const funcParamsToQueries = (funcs, requestQuery, paramsOperations, table) => {
    const queries = {};

    funcs.forEach((f) => {
        if (getStatsQuery[f]) {
            queries[f] = getStatsQuery[f](
                requestQuery,
                paramsOperations,
                table
            );
        } else {
            throw new Error(`Invalid function: ${f}`);
        }
    });

    return queries;
};

const queriesToResults = async (db_client, queries) => {
    const results = {};
    for (const key in queries) {
        const resultSet = await db_client.query({
            query: queries[key],
            format: 'JSONEachRow',
        });
        const data = await resultSet.json();
        results[key] = Number(data[0][`${key}()`]);
    }
    return results;
};

module.exports = {
    funcParamsToQueries,
    queriesToResults,
};
