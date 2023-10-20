'use strict';
const client = require('../../data/clickhouse');
const { table } = require('./constants');
const {
    getWardsQuery,
    getWardByIdQuery,
    deleteWardByIdQuery,
} = require('./paramsHandler');

const getWards = async (request, reply) => {
    try {
        let query = getWardsQuery(request.query);
        const resultSet = await client.query({
            query,
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
    const query = getWardByIdQuery(request.params);

    try {
        const result = await client.query({
            query,
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
        const { iID_MaPhuongXa, sTenPhuongXa, iID_MaQuan } = request.body;
        await client.insert({
            table,
            values: [
                {
                    iID_MaPhuongXa: Number(iID_MaPhuongXa),
                    sTenPhuongXa: String(sTenPhuongXa),
                    iID_MaQuan: Number(iID_MaQuan),
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
    const query = deleteWardByIdQuery(request.params);
    try {
        await client.query({
            query,
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
