'use strict';

const { cleanAndConvert } = require('../../utilities/queryHelper');
const { table, getRealEstatesReply } = require('./constants');

const getRealEstateByIdQuery = ({ sID }) => {
    sID = String(sID);
    const query = `SELECT ${getRealEstatesReply} FROM ${table} WHERE sID = toUUID('${sID}')`;
    return query;
};

// Function to remove null or undefined values from an object
const postRealEstateCleanedData = (data) => {
    data.dNgayTao = new Date();
    return cleanAndConvert(data);
};

const deleteRealEstateByIdQuery = ({ sID }) => {
    sID = String(sID);
    const query = `ALTER TABLE ${table} DELETE WHERE sID = toUUID('${sID}')`;
    return query;
};

module.exports = {
    getRealEstateByIdQuery,
    postRealEstateCleanedData,
    deleteRealEstateByIdQuery,
};
