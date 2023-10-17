'use strict';

const {
    getRealEstates,
    getRealEstateById,
    postRealEstate,
    deleteRealEstate,
} = require('../../../controllers/bds');

// BDS schema
const RealEstates = {
    type: 'object',
    properties: {
        sID: { type: 'string' },
        sMa: { type: 'string' },
        sNoiDung: { type: 'string' },
        iDienTich: { type: 'number' },
        sGiaChaoHopDong: { type: 'string' },
        sAvatar: { type: 'string' },
        sHotline: { type: 'string' },
    },
};

const RealEstate = {
    type: 'object',
    properties: {
        sID: { type: 'string' },
        sMa: { type: 'string' },
        sNoiDung: { type: 'string' },
        sTenTinh: { type: 'string' },
        iID_MaTinh: { type: 'integer' },
        sTenQuan: { type: 'string' },
        iID_MaQuan: { type: 'integer' },
        sTenPhuongXa: { type: 'string' },
        iID_MaPhuongXa: { type: 'integer' },
        sTenDuong: { type: 'string' },
        sLoaiHang: { type: 'string' },
        iDienTich: { type: 'number' },
        iSoTang: { type: 'number' },
        iMatTien: { type: 'number' },
        iGiaChaoHopDong: { type: 'number' },
        sGiaChaoHopDong: { type: 'string' },
        sHuongNha: { type: 'string' },
        iID_HuongNha: { type: 'integer' },
        iSoPhongNgu: { type: 'number' },
        iSoToilet: { type: 'number' },
        sMoTa: { type: 'string' },
        sFiles: { type: 'string' },
        sLat: { type: 'string' },
        sLng: { type: 'string' },
        sHotline: { type: 'string' },
    },
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
    handler: getRealEstates,
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
    handler: getRealEstateById,
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
    handler: postRealEstate,
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
    handler: deleteRealEstate,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getRealEstatesOpts);
    fastify.get('/:id', getRealEstateByIdOpts);
    fastify.post('/', postRealEstateOpts);
    fastify.delete('/:id', deleteRealEstateOpts);
};
