'use strict';

const moment = require('moment');
const {
    maxUInt64,
    paramToCondition,
    removeNullValues,
} = require('../../utilities/queryHelper');
const { concatWithSpace } = require('../../utilities/string');
const { table, getRealEstatesReply } = require('./constants');

// Main function to construct the SQL query
const getRealEstatesQuery = (requestQuery) => {
    // Initialize the WHERE clause
    let where = '';

    if (requestQuery) {
        // Define an array of objects that map the query parameters to the SQL operators
        const paramsOperations = [
            { p: 'iID_MaTinh', o: 'IN' },
            { p: 'iID_MaQuan', o: 'IN' },
            { p: 'sLoaiHang', o: 'LIKEAND' },
            { p: 'iTuDienTich', o: '>=' },
            { p: 'iDenDienTich', o: '<=' },
            { p: 'iTuTang', o: '>=' },
            { p: 'iDenTang', o: '<=' },
            { p: 'iTuMatTien', o: '>=' },
            { p: 'iDenMatTien', o: '<=' },
            { p: 'iTuGia', o: '>=' },
            { p: 'iDenGia', o: '<=' },
            { p: 'iID_HuongNha', o: 'IN' },
            { p: 'iSoPhongNgu', o: 'IN' },
            { p: 'iSoToilet', o: 'IN' },
            { p: 'sMa', o: 'IN' },
        ];

        paramsOperations.forEach((po) => {
            const value = requestQuery[po.p];
            if (value) {
                // Use the paramToCondition function to convert the parameter and its value into a SQL condition
                where = concatWithSpace(where, paramToCondition(po, value));
            }
        });
    }

    // Add the LIMIT and OFFSET clauses
    const { skip, limit } = requestQuery;
    const skipValue = skip || 0;
    const limitValue = limit || maxUInt64;

    // Construct the final SQL query
    const query = `SELECT ${getRealEstatesReply} FROM ${table} WHERE 1 = 1 ${where} LIMIT ${limitValue} OFFSET ${skipValue}`;

    return query;
};

const getRealEstateByIdQuery = ({ sID }) => {
    sID = String(sID);
    const query = `SELECT ${getRealEstatesReply} FROM ${table} WHERE sID = toUUID('${sID}')`;
    return query;
};

// Function to remove null or undefined values from an object
const postRealEstateCleanedData = (data) => {
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
    } = data;

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

    return removeNullValues(values);
};

const deleteRealEstateByIdQuery = ({ sID }) => {
    sID = String(sID);
    const query = `ALTER TABLE ${table} DELETE WHERE sID = toUUID('${sID}')`;
    return query;
};

module.exports = {
    getRealEstatesQuery,
    getRealEstateByIdQuery,
    postRealEstateCleanedData,
    deleteRealEstateByIdQuery,
};
