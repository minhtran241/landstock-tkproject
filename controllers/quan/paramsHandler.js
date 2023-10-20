'use strict';

const { table } = require('./constants');

const getDistrictsQuery = (requestQuery) => {
    let { iID_MaTinh } = requestQuery;
    let query;
    if (iID_MaTinh) {
        iID_MaTinh = Number(iID_MaTinh);
        query = `SELECT iID_MaQuan, sTenQuan FROM ${table} WHERE iID_MaTinh = ${iID_MaTinh}`;
    } else {
        query = `SELECT * FROM ${table}`;
    }
    return query;
};

const getDistrictByIdQuery = (requestParams) => {
    let { id } = requestParams;
    id = Number(id);
    const query = `SELECT iID_MaQuan, sTenQuan FROM ${table} WHERE iID_MaQuan = ${id}`;
    return query;
};

const deleteDistrictByIdQuery = (requestParams) => {
    let { id } = requestParams;
    id = Number(id);
    const query = `ALTER TABLE ${table} DELETE WHERE iID_MaQuan = ${id}`;
    return query;
};

module.exports = {
    getDistrictsQuery,
    getDistrictByIdQuery,
    deleteDistrictByIdQuery,
};
