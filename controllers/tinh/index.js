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
    try {
        const { iID_MaTinh, sTenTinh } = request.body;

        // Insert data into ClickHouse using parameterized query
        const query =
            'INSERT INTO tinh (iID_MaTinh, sTenTinh) VALUES ({iID_MaTinh: Int64}, {sTenTinh: String})';
        await client.insert({
            table: 'tinh',
            values: [
                {
                    iID_MaTinh: Number(iID_MaTinh),
                    sTenTinh: String(sTenTinh),
                },
            ],
            format: 'JSONEachRow',
        });

        reply.code(201).send({ message: 'City inserted successfully' });
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
