'use strict';
const client = require('../../data/clickhouse');

const table = 'tb_HuongNha';

const getDirections = async (request, reply) => {
    try {
        const query = `SELECT * FROM ${table}`;
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const directionSet = await resultSet.json();
        reply.send(directionSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const getDirectionById = async (request, reply) => {
    const { id } = request.params;
    const query = `SELECT * FROM ${table} WHERE iID_HuongNha = {id: Int64}`;

    try {
        const result = await client.query({
            query,
            query_params: { id: Number(id) },
            format: 'JSONEachRow',
        });
        const direction = await result.json();
        if (direction === null) {
            // Handle the case where no data was found for the given ID
            reply.status(404).send({ error: 'direction not found' });
            return;
        }
        reply.send(direction);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

const postDirection = async (request, reply) => {
    try {
        const { iID_HuongNha, sHuongNha } = request.body;
        await client.insert({
            table,
            values: [
                {
                    iID_HuongNha: Number(iID_HuongNha),
                    sHuongNha: String(sHuongNha),
                },
            ],
            format: 'JSONEachRow',
        });
        reply.code(201).send({ message: 'direction inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const deleteDirection = async (request, reply) => {
    const { id } = request.params;
    const query = `ALTER TABLE ${table} DELETE WHERE iID_HuongNha = {id: Int64}`;
    try {
        await client.query({
            query,
            query_params: { id: Number(id) },
        });
        reply.send({ message: 'direction deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getDirections,
    getDirectionById,
    postDirection,
    deleteDirection,
};
