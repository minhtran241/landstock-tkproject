'use strict';
const moment = require('moment');
const client = require('../../data/clickhouse');
const { getRealEstatesQuery, removeNullValues } = require('./utils');

const table = 'tb_BDS';
const getRealEstatesReply =
    'sID, sMa, sNoiDung, iDienTich, sGiaChaoHopDong, sAvatar, sHotline';
const getRealEstateByIdReply =
    'sID, sMa, sNoiDung, sTenTinh, iID_MaTinh, sTenQuan, iID_MaQuan, sTenPhuongXa, iID_MaPhuongXa, sTenDuong, sLoaiHang, iDienTich, iSoTang, iMatTien, iGiaChaoHopDong, sGiaChaoHopDong, sHuongNha, iID_HuongNha, iSoPhongNgu, iSoToilet, sMoTa, sFiles, sLat, sLng, sHotline';

const getRealEstates = async (request, reply) => {
    try {
        const query = getRealEstatesQuery(request, table, getRealEstatesReply);
        console.info(query);
        const resultSet = await client.query({
            query,
            format: 'JSONEachRow',
        });
        const realEstateSet = await resultSet.json();
        reply.send(realEstateSet);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

const getRealEstateById = async (request, reply) => {
    const { sID } = request.params;
    const query = `SELECT ${getRealEstateByIdReply} FROM ${table} WHERE sID = toUUID({sID: String})`;

    try {
        const result = await client.query({
            query,
            query_params: { sID: String(sID) },
            format: 'JSONEachRow',
        });
        const realEstate = await result.json();
        if (realEstate === null) {
            // Handle the case where no data was found for the given sID
            reply.status(404).send({ error: 'real estate not found' });
            return;
        }
        reply.send(realEstate);
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        throw error;
    }
};

const postRealEstate = async (request, reply) => {
    try {
        // Extract data from the request body
        const {
            sMa,
            sNoiDung,
            sTenTinh,
            iID_MaTinh,
            sTenQuan,
            iID_MaQuan,
            sTenPhuongXa,
            iID_MaPhuongXa,
            sTenDuong,
            sLoaiHang,
            iDienTich,
            iSoTang,
            iMatTien,
            iGiaChaoHopDong,
            sGiaChaoHopDong,
            sHuongNha,
            iID_HuongNha,
            iSoPhongNgu,
            iSoToilet,
            sMoTa,
            sFiles,
            sAvatar,
            sLat,
            sLng,
            sHotline,
        } = request.body;

        // Construct the values object
        const values = {
            sMa,
            sNoiDung,
            sTenTinh,
            iID_MaTinh,
            sTenQuan,
            iID_MaQuan,
            sTenPhuongXa,
            iID_MaPhuongXa,
            sTenDuong,
            sLoaiHang,
            iDienTich,
            iSoTang,
            iMatTien,
            iGiaChaoHopDong,
            sGiaChaoHopDong,
            sHuongNha,
            iID_HuongNha,
            iSoPhongNgu,
            iSoToilet,
            sMoTa,
            sFiles,
            sAvatar,
            sLat,
            sLng,
            sHotline,
            dNgayTao: moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log(values);

        // Remove null or undefined values from the object
        const cleanedValues = removeNullValues(values);

        // Insert the values into the ClickHouse table
        await client.insert({
            table,
            values: [cleanedValues],
            format: 'JSONEachRow',
        });

        reply.code(201).send({ message: 'real estate inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'Insertion failed' });
    }
};

const deleteRealEstate = async (request, reply) => {
    const { sID } = request.params;
    const query = `ALTER TABLE ${table} DELETE WHERE sID = toUUID({sID: String})`;
    try {
        await client.query({
            query,
            query_params: { sID: String(sID) },
        });
        reply.send({ message: 'real estate deleted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'query failed' });
    }
};

module.exports = {
    getRealEstates,
    getRealEstateById,
    postRealEstate,
    deleteRealEstate,
};
