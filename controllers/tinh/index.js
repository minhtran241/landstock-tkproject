'use strict';
const clickhouse = require('@clickhouse/client');

const client = clickhouse.createClient({
    host: process.env.CLICKHOUSE_HOST ?? 'http://localhost:8123',
    username: process.env.CLICKHOUSE_USER ?? 'default',
    password: process.env.CLICKHOUSE_PASSWORD ?? '',
    max_open_connections: 3,
});

const getCities = async (request, reply) => {
    const resultSet = await client.query({
        query: 'SELECT * FROM db_test.tinh LIMIT 10',
        format: 'JSONEachRow',
    });
    const citySet = await resultSet.json();
    console.log(citySet);
    reply.send(citySet);
};

module.exports = {
    getCities,
};
