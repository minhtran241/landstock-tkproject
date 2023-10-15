'use strict';
const clickhouse = require('@clickhouse/client');

const client = clickhouse.createClient({
    host: process.env.CLICKHOUSE_HOST ?? 'http://localhost:8123',
    username: process.env.CLICKHOUSE_USER ?? 'default',
    password: process.env.CLICKHOUSE_PASSWORD ?? '',
    max_open_connections: 3,
});

const getCities = async (request, reply) => {
    console.log(client);
    const resultSet = await client.query({
        query: 'SELECT number FROM system.numbers LIMIT 10',
        format: 'JSONEachRow',
    });
    for await (const rows of resultSet.stream()) {
        rows.forEach((row) => {
            console.log(row.text);
        });
    }
};

module.exports = {
    getCities,
};
