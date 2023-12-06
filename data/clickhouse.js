'use strict';
const clickhouse = require('@clickhouse/client');

// Create a Clickhouse client instance
const client = clickhouse.createClient({
    host: process.env.CLICKHOUSE_HOST ?? 'http://localhost:8123',
    username: process.env.CLICKHOUSE_USER ?? 'default',
    password: process.env.CLICKHOUSE_PASSWORD ?? '',
    database: process.env.CLICKHOUSE_DATABASE ?? 'default',
    max_open_connections: process.env.CLICKHOUSE_MAX_OPEN_CONNECTIONS ?? 1,
});

module.exports = client;
