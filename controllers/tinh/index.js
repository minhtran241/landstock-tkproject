'use strict';
const client = require('../../data/clickhouse');

const getCities = async (request, reply) => {
    try {
        let query;
        let query_params;
        const { iID_MaTinh } = request.query;
        if (iID_MaTinh) {
            query = 'SELECT * FROM tinh WHERE iID_MaTinh = {iID_MaTinh: Int64}';
            query_params = { iID_MaTinh: Number(iID_MaTinh) };
        } else {
            query = 'SELECT * FROM tinh';
            query_params = {};
        }
        const resultSet = await client.query({
            query,
            query_params,
            format: 'JSONEachRow',
        });
        const citySet = await resultSet.json();
        reply.send(citySet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
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
            reply.status(404).send({ error: 'city not found' });
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
        reply.code(201).send({ message: 'city inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const deleteCity = async (request, reply) => {
    const { id } = request.params;
    const query = 'ALTER TABLE tinh DELETE WHERE iID_MaTinh = {id: Int64}';
    try {
        await client.query({
            query,
            query_params: { id: Number(id) },
        });
        reply.send({ message: 'city deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getCities,
    getCityById,
    postCity,
    deleteCity,
};
