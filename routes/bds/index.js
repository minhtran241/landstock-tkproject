'use strict';

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../controllers/bds');
const { po_BDS } = require('../../utilities/paramsOperations');

// BDS schema
const RealEstates = {
    type: 'object',
    properties: po_BDS
        .filter((po) => po.a.includes('s'))
        .map((po) => ({ [po.p]: { type: po.t } })),
};

const RealEstate = {
    type: 'object',
    properties: po_BDS
        .filter((po) => po.a.includes('i'))
        .map((po) => ({ [po.p]: { type: po.t } })),
};

const getRealEstatesOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                realEstates: RealEstates,
            },
        },
    },
    handler: getAllEntries,
};

const getRealEstateByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                realEstates: RealEstate,
            },
        },
    },
    handler: getEntryById,
};

const postRealEstateOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                iID_MaTinh: { type: 'integer' },
                iID_MaQuan: { type: 'integer' },
                sLoaiHang: { type: 'string' },
                iTuDienTich: { type: 'number' },
                iDenDienTich: { type: 'number' },
                iTuTang: { type: 'number' },
                iDenTang: { type: 'number' },
                iTuMatTien: { type: 'number' },
                iDenMatTien: { type: 'number' },
                iTuGia: { type: 'number' },
                iDenGia: { type: 'number' },
                iID_HuongNha: { type: 'integer' },
                iSoPhongNgu: { type: 'number' },
                iSoToilet: { type: 'number' },
                sMa: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: postEntry,
};

const deleteRealEstateOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteEntry,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getRealEstatesOpts);
    fastify.get('/:id', getRealEstateByIdOpts);
    fastify.post('/', postRealEstateOpts);
    fastify.delete('/:id', deleteRealEstateOpts);
};
