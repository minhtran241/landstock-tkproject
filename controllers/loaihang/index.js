'use strict';
const client = require('../../data/clickhouse');

const table = 'tb_LoaiHang';

const getSections = async (request, reply) => {
    try {
        const query = `SELECT sCode, sTen FROM ${table}`;
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const sectionSet = await resultSet.json();
        reply.send(sectionSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const getSectionByCode = async (request, reply) => {
    const { code } = request.params;
    const query = `SELECT sCode, sTen FROM ${table} WHERE sCode = {code: String}`;

    try {
        const result = await client.query({
            query,
            query_params: { code: String(code) },
            format: 'JSONEachRow',
        });
        const section = await result.json();
        if (section === null) {
            // Handle the case where no data was found for the given Code
            reply.status(404).send({ error: 'section not found' });
            return;
        }
        reply.send(section);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

const postSection = async (request, reply) => {
    try {
        const { sCode, sTen } = request.body;
        await client.insert({
            table,
            values: [
                {
                    sCode: String(sCode),
                    sTen: String(sTen),
                },
            ],
            format: 'JSONEachRow',
        });
        reply.code(201).send({ message: 'section inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const deleteSection = async (request, reply) => {
    const { code } = request.params;
    const query = `ALTER TABLE ${table} DELETE WHERE sCode = {code: String}`;
    try {
        await client.query({
            query,
            query_params: { code: String(code) },
        });
        reply.send({ message: 'section deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getSections,
    getSectionByCode,
    postSection,
    deleteSection,
};