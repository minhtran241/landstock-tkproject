'use strict';
const client = require('../../data/clickhouse');

const table = 'tb_PhuongXa';

const getWards = async (request, reply) => {
    try {
        let query, query_params;
        const { iID_MaQuan } = request.query;
        if (iID_MaQuan) {
            query = `SELECT * FROM ${table} WHERE iID_MaQuan = {iID_MaQuan: Int64}`;
            query_params = { iID_MaQuan: Number(iID_MaQuan) };
        } else {
            query = `SELECT * FROM ${table}`;
            query_params = {};
        }
        const resultSet = await client.query({
            query,
            query_params,
            format: 'JSONEachRow',
        });
        const wardSet = await resultSet.json();
        reply.send(wardSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const getWardById = async (request, reply) => {
    const { id } = request.params;
    const query = `SELECT * FROM ${table} WHERE iID_MaPhuongXa = {id: Int64}`;

    try {
        const result = await client.query({
            query,
            query_params: { id: Number(id) },
            format: 'JSONEachRow',
        });
        const ward = await result.json();
        if (ward === null) {
            // Handle the case where no data was found for the given ID
            reply.status(404).send({ error: 'ward not found' });
            return;
        }
        reply.send(ward);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

const postWard = async (request, reply) => {
    try {
        const { iID_MaPhuongXa, sTenPhuongXa } = request.body;
        await client.insert({
            table,
            values: [
                {
                    iID_MaPhuongXa: Number(iID_MaPhuongXa),
                    sTenPhuongXa: String(sTenPhuongXa),
                },
            ],
            format: 'JSONEachRow',
        });
        reply.code(201).send({ message: 'ward inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const deleteWard = async (request, reply) => {
    const { id } = request.params;
    const query = `ALTER TABLE ${table} DELETE WHERE iID_MaPhuongXa = {id: Int64}`;
    try {
        await client.query({
            query,
            query_params: { id: Number(id) },
        });
        reply.send({ message: 'ward deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getWards,
    getWardById,
    postWard,
    deleteWard,
};
