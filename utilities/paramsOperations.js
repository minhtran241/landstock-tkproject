'use strict';

// For each param: p: param name, o: operator, a: action, sbi: select by id
// Action involves the following: k = primary key, s = select, p = post, d = delete, c: in condition (where clause)

const po_BDS = [
    { p: 'sID', o: '=', a: 'ks', sbi: true }, // Primary key, Select for sID
    { p: 'sMa', o: '=', a: 's', sbi: true }, // Select for sMa
    { p: 'sNoiDung', o: 'LIKE', a: 'sp', sbi: true }, // Select and Post for sNoiDung
    { p: 'sTenTinh', o: 'LIKE', a: 'p', sbi: true }, // Select and Post for sTenTinh
    { p: 'iID_MaTinh', o: 'IN', a: 'pdc', sbi: true }, // Post, Delete, and Condition for iID_MaTinh
    { p: 'sTenQuan', o: 'LIKE', a: 'p', sbi: true }, // Select for sTenQuan
    { p: 'iID_MaQuan', o: 'IN', a: 'pdc', sbi: true }, // Post, Delete, and Condition for iID_MaQuan
    { p: 'sTenPhuongXa', o: 'LIKE', a: 'p', sbi: true }, // Select for sTenPhuongXa
    { p: 'iID_MaPhuongXa', o: 'IN', a: 'p', sbi: true }, // Select for iID_MaPhuongXa
    { p: 'sTenDuong', o: 'LIKE', a: 'p', sbi: true }, // Select for sTenDuong
    { p: 'sLoaiHang', o: 'LIKEAND', a: 'pdc', sbi: true }, // Post, Delete, and Condition for sLoaiHang
    { p: 'iDienTich', o: 'BETWEEN', a: 'spdc', sbi: true }, // Select, Post, Delete, and Condition for iDienTich
    { p: 'iSoTang', o: 'BETWEEN', a: 's', sbi: true }, // Select for iSoTang
    { p: 'iMatTien', o: 'BETWEEN', a: 'pdc', sbi: true }, // Post, Delete, and Condition for iMatTien
    { p: 'iGiaChaoHopDong', o: 'BETWEEN', a: 'pdc', sbi: true }, // Post, Delete, and Condition for iGiaChaoHopDong
    { p: 'sGiaChaoHopDong', o: 'LIKE', a: 'sp', sbi: true }, // Select and Post for sGiaChaoHopDong
    { p: 'sHuongNha', o: 'LIKE', a: 'p', sbi: true }, // Select for sHuongNha
    { p: 'iID_HuongNha', o: 'IN', a: 'pdc', sbi: true }, // Post, Delete, and Condition for iID_HuongNha
    { p: 'iSoPhongNgu', o: 'IN', a: 'pdc', sbi: true }, // Post, Delete, and Condition for iSoPhongNgu
    { p: 'iSoToilet', o: 'IN', a: 'pdc', sbi: true }, // Post, Delete, and Condition for iSoToilet
    { p: 'sMoTa', o: 'LIKE', a: 'p', sbi: true }, // Select for sMoTa
    { p: 'sFiles', o: 'LIKE', a: 'p', sbi: true }, // Select for sFiles
    { p: 'sAvatar', o: 'LIKE', a: 'sp', sbi: false }, // Select and Post for sAvatar
    { p: 'sLat', o: 'LIKE', a: 'p', sbi: true }, // Select for sLat
    { p: 'sLng', o: 'LIKE', a: 'p', sbi: true }, // Select for sLng
    { p: 'sHotline', o: 'IN', a: 'sp', sbi: true }, // Select and Post for sHotline
    { p: 'dNgayTao', o: 'BETWEEN', a: '', sbi: false }, // No specific action for dNgayTao
    { p: 'createdAt', o: '=', a: '', sbi: false }, // No specific action for createdAt
];

const convertToType = (name, value) => {
    if (name.startWith('i')) {
        return Number(value);
    } else if (name.startWith('d')) {
        return new Date(value);
    } else if (name.startWith('s')) {
        return String(value);
    } else if (name.startWith('b')) {
        return Boolean(value);
    }
    return value;
};

// const po_BDS = [
//     { p: 'iID_MaTinh', o: 'IN', a: 'spd', sbi: true },
//     { p: 'iID_MaQuan', o: 'IN' },
//     { p: 'sLoaiHang', o: 'LIKEAND' },
//     { p: 'iTuDienTich', o: '>=' },
//     { p: 'iDenDienTich', o: '<=' },
//     { p: 'iTuTang', o: '>=' },
//     { p: 'iDenTang', o: '<=' },
//     { p: 'iTuMatTien', o: '>=' },
//     { p: 'iDenMatTien', o: '<=' },
//     { p: 'iTuGia', o: '>=' },
//     { p: 'iDenGia', o: '<=' },
//     { p: 'iID_HuongNha', o: 'IN' },
//     { p: 'iSoPhongNgu', o: 'IN' },
//     { p: 'iSoToilet', o: 'IN' },
//     { p: 'sMa', o: 'IN' },
// ];

const po_Tinh = [
    { p: 'iID_MaTinh', o: 'IN', a: 'kspd' },
    { p: 'iID_MaQuan', o: 'IN', a: 'kspd' },
];

module.exports = {
    po_BDS,
    convertToType,
};
