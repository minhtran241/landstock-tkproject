'use strict';

const client = require('../../data/clickhouse');
const { getSelectQuery } = require('../../utilities/queryGenerators');

const getAllStandard = async (request, reply, po_Name, table) => {
    try {
        const query = getSelectQuery(request.query, po_Name, table);
        console.info(request.query);
        console.info(query);
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const realEstateSet = await resultSet.json();
        reply.send(realEstateSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = getAllStandard;
