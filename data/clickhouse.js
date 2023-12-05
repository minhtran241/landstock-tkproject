'use strict';
// const clickhouse = require('@clickhouse/client');
const { ClickHouseClient } = require('@depyronick/clickhouse-client');

// Create a Clickhouse client instance
// const client = clickhouse.createClient({
//     host: process.env.CLICKHOUSE_HOST ?? 'http://localhost:8123',
//     username: process.env.CLICKHOUSE_USER ?? 'default',
//     password: process.env.CLICKHOUSE_PASSWORD ?? '',
//     database: process.env.CLICKHOUSE_DATABASE ?? 'default',
//     max_open_connections: process.env.CLICKHOUSE_MAX_OPEN_CONNECTIONS ?? 1,
// });

const client = new ClickHouseClient({
    // host: process.env.CLICKHOUSE_HOST,
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD,
    database: process.env.CLICKHOUSE_DATABASE,
    // max_open_connections: process.env.CLICKHOUSE_MAX_OPEN_CONNECTIONS ?? 1,
    logger: console,
});

module.exports = client;
