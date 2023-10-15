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

const getCity = async (request, reply) => {
    const { id } = request.params;
    const query = 'SELECT * FROM tinh WHERE iID_MaTinh = ?';

    try {
        const resultSet = await client.query({
            query,
            params: [id],
            format: 'JSONEachRow',
        });
        const city = await resultSet.json();
        if (city.length === 0) {
            // Handle the case where no data was found for the given id
            reply.status(404).send({ error: 'City not found' });
        } else {
            reply.send(city);
        }
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'Query failed' });
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
    getCity,
    postCity,
};
