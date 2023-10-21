'use strict';
const { po_PhuongXa } = require('../../utilities/paramsOperations');
const {
    getAllStandard,
    getByIdStandard,
    postStandard,
    deleteStandard,
} = require('../standard');
const { table } = require('./constants');

const getWards = async (request, reply) => {
    return getAllStandard(request, reply, po_PhuongXa, table);
};

const getWardById = async (request, reply) => {
    return getByIdStandard(
        request,
        reply,
        po_PhuongXa,
        table,
        'iID_MaPhuongXa'
    );
};

const postWard = async (request, reply) => {
    return postStandard(request, reply, po_PhuongXa, table);
};

const deleteWard = async (request, reply) => {
    return deleteStandard(request, reply, po_PhuongXa, table, 'iID_MaPhuongXa');
};

module.exports = {
    getWards,
    getWardById,
    postWard,
    deleteWard,
};
