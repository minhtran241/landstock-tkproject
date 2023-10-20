'use strict';

const table = 'tb_BDS';
const getRealEstatesReply =
    'sID, sMa, sNoiDung, iDienTich, sGiaChaoHopDong, sAvatar, sHotline';
const getRealEstateByIdReply =
    'sID, sMa, sNoiDung, sTenTinh, iID_MaTinh, sTenQuan, iID_MaQuan, sTenPhuongXa, iID_MaPhuongXa, sTenDuong, sLoaiHang, iDienTich, iSoTang, iMatTien, iGiaChaoHopDong, sGiaChaoHopDong, sHuongNha, iID_HuongNha, iSoPhongNgu, iSoToilet, sMoTa, sFiles, sLat, sLng, sHotline';

module.exports = {
    table,
    getRealEstatesReply,
    getRealEstateByIdReply,
};
