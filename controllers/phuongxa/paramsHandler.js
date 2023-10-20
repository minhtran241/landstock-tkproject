'use strict';

const { table } = require('./constants');

const getWardsQuery = (requestQuery) => {
    let query;
    let { iID_MaQuan } = requestQuery;
    if (iID_MaQuan) {
        iID_MaQuan = Number(iID_MaQuan);
        query = `SELECT iID_MaPhuongXa, sTenPhuongXa FROM ${table} WHERE iID_MaQuan = ${iID_MaQuan}`;
    } else {
        query = `SELECT * FROM ${table}`;
    }
    return query;
};

const getWardByIdQuery = (requestParams) => {
    let { id } = requestParams;
    id = Number(id);
    const query = `SELECT iID_MaPhuongXa, sTenPhuongXa FROM ${table} WHERE iID_MaPhuongXa = ${id}`;
    return query;
};

const deleteWardByIdQuery = (requestParams) => {
    let { id } = requestParams;
    id = Number(id);
    const query = `ALTER TABLE ${table} DELETE WHERE iID_MaPhuongXa = ${id}`;
    return query;
};

module.exports = {
    getWardsQuery,
    getWardByIdQuery,
    deleteWardByIdQuery,
};
