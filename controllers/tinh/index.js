'use strict';
const client = require('../../data/clickhouse');

const getCities = async (request, reply) => {
    try {
        const query = 'SELECT * FROM tinh LIMIT 10';
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const citySet = await resultSet.json();
        reply.send(citySet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'Query failed' });
    }
};

const getCityById = async (request, reply) => {
    const { id } = request.params;
    const query = 'SELECT * FROM tinh WHERE iID_MaTinh = {id: Int64}';

    try {
        const result = await client.query({
            query,
            query_params: { id: Number(id) },
            format: 'JSONEachRow',
        });
        const city = await result.json();
        console.log(city);
        if (city === null) {
            // Handle the case where no data was found for the given ID
            reply.status(404).send({ error: 'City not found' });
            return;
        }
        reply.send(city);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

const postCity = async (request, reply) => {
    const { sTenTinh } = request.body;
    const query = 'INSERT INTO tinh (sTenTinh) VALUES (?)';

    try {
        const resultSet = await client.query({
            query,
            params: [sTenTinh],
            format: 'JSONEachRow',
        });
        const city = await resultSet.json();
        reply.code(201).send(city);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'Query failed' });
    }
};

module.exports = {
    getCities,
    getCityById,
    postCity,
};
