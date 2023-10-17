'use strict';
const client = require('../../data/clickhouse');

const table = 'tb_BDS';
const maxUInt64 = '18446744073709551615';
const getRealEstatesReply =
    'sID, sMa, sNoiDung, iDienTich, sGiaChaoHopDong, sAvatar, sHotline';
const getRealEstateByIdReply =
    'sID, sMa, sNoiDung, sTenTinh, iID_MaTinh, sTenQuan, iID_MaQuan, sTenPhuongXa, iID_MaPhuongXa, sTenDuong, sLoaiHang, iDienTich, iSoTang, iMatTien, iGiaChaoHopDong, sGiaChaoHopDong, sHuongNha, iID_HuongNha, iSoPhongNgu, iSoToilet, sMoTa, sFiles, sLat, sLng, sHotline';

const getRealEstates = async (request, reply) => {
    try {
        const { skip, limit } = request.query; // Extract skip and limit from the request query parameters

        // Set default values for skip and limit if they are not provided
        const skipValue = skip || 0;
        const limitValue = limit || maxUInt64; // Use the maximum UInt64 value for unlimited

        const query = `SELECT ${getRealEstatesReply} FROM ${table} LIMIT ${limitValue} OFFSET ${skipValue}`;
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
    const query = `SELECT ${getRealEstateByIdReply} FROM ${table} WHERE sID = {sID: UUID}`;

    try {
        const result = await client.query({
            query,
            query_params: { sID: sID },
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
        const {
            iID_MaTinh,
            iID_MaQuan,
            sLoaiHang,
            iTuDienTich,
            iDenDienTich,
            iTuTang,
            iDenTang,
            iTuMatTien,
            iDenMatTien,
            iTuGia,
            iDenGia,
            iID_HuongNha,
            iSoPhongNgu,
            iSoToilet,
            sMa,
        } = request.body;

        // Define the values object to be inserted into the ClickHouse table
        const values = {
            iID_MaTinh: Number(iID_MaTinh),
            iID_MaQuan: iID_MaQuan ? Number(iID_MaQuan) : null,
            sLoaiHang: sLoaiHang || null,
            iTuDienTich: iTuDienTich !== null ? Number(iTudienTich) : null,
            iDenDienTich: iDenDienTich !== null ? Number(iDenDienTich) : null,
            iTuTang: iTuTang !== null ? Number(iTuTang) : null,
            iDenTang: iDenTang !== null ? Number(iDenTang) : null,
            iTuMatTien: iTuMatTien !== null ? Number(iTuMatTien) : null,
            iDenMatTien: iDenMatTien !== null ? Number(iDenMatTien) : null,
            iTuGia: iTuGia !== null ? Number(iTuGia) : null,
            iDenGia: iDenGia !== null ? Number(iDenGia) : null,
            iID_HuongNha: iID_HuongNha !== null ? Number(iID_HuongNha) : null,
            iSoPhongNgu: iSoPhongNgu !== null ? Number(iSoPhongNgu) : null,
            iSoToilet: iSoToilet !== null ? Number(iSoToilet) : null,
            sMa: sMa || null,
        };

        // Insert the values into the ClickHouse table
        await client.insert({
            table: 'your_table_name', // Replace 'your_table_name' with the actual table name
            values: [values],
            format: 'JSONEachRow',
        });

        reply.code(201).send({ message: 'Real estate inserted successfully' });
    } catch (error) {
        console.error('Error executing ClickHouse query:', error);
        reply.status(500).send({ error: 'Insertion failed' });
    }
};

const deleteRealEstate = async (request, reply) => {
    const { sID } = request.params;
    const query = `ALTER TABLE ${table} DELETE WHERE sID = {sID: String}`;
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
