'use strict';
const client = require('../../data/clickhouse');

const tableName = 'tb_Quan';

const getDistricts = async (request, reply) => {
    try {
        let query, query_params;
        const { iID_MaTinh } = request.query;
        if (iID_MaTinh) {
            query = `SELECT * FROM ${tableName} WHERE iID_MaTinh = {iID_MaTinh: Int64}`;
            query_params = { iID_MaTinh: Number(iID_MaTinh) };
        } else {
            query = `SELECT * FROM ${tableName}`;
            query_params = {};
        }
        const resultSet = await client.query({
            query,
            query_params,
            format: 'JSONEachRow',
        });
        const districtSet = await resultSet.json();
        reply.send(districtSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const getDistrictById = async (request, reply) => {
    const { id } = request.params;
    const query = `SELECT * FROM ${tableName} WHERE iID_MaQuan = {id: Int64}`;

    try {
        const result = await client.query({
            query,
            query_params: { id: Number(id) },
            format: 'JSONEachRow',
        });
        const district = await result.json();
        console.log(district);
        if (district === null) {
            // Handle the case where no data was found for the given ID
            reply.status(404).send({ error: 'district not found' });
            return;
        }
        reply.send(district);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

const postDistrict = async (request, reply) => {
    try {
        const { iID_MaQuan, sTenQuan } = request.body;
        await client.insert({
            table: 'quan',
            values: [
                {
                    iID_MaQuan: Number(iID_MaQuan),
                    sTenQuan: String(sTenQuan),
                },
            ],
            format: 'JSONEachRow',
        });
        reply.code(201).send({ message: 'district inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const deleteDistrict = async (request, reply) => {
    const { id } = request.params;
    const query = `ALTER TABLE ${tableName} DELETE WHERE iID_MaQuan = {id: Int64}`;
    try {
        await client.query({
            query,
            query_params: { id: Number(id) },
        });
        reply.send({ message: 'district deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getDistricts,
    getDistrictById,
    postDistrict,
    deleteDistrict,
};
