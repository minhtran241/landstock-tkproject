'use strict';

// For each param: p: param name, o: operator, a: action, sbi: select by id
// Action involves the following: k = primary key, s = select, p = post, d = delete, c: in condition (where clause)

const po_BDS = [
    { p: 'sID', o: 'EQUAL', a: 'ks', sbi: true }, // Primary key, Select for sID
    { p: 'sMa', o: 'EQUAL', a: 's', sbi: true }, // Select for sMa
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
    { p: 'createdAt', o: 'EQUAL', a: '', sbi: false }, // No specific action for createdAt
];

const po_KhachHang = [
    { p: 'sID', o: 'EQUAL', a: 'ks', sbi: true },
    { p: 'sTen', o: 'LIKE', a: 'sp', sbi: true },
    { p: 'sDienThoai', o: 'EQUAL', a: 'spdc', sbi: true },
    { p: 'sEmail', o: 'LIKE', a: 'spdc', sbi: true },
    { p: 'iTrangThai', o: 'IN', a: 'spdc', sbi: true },
    { p: 'sMa', o: 'LIKE', a: 'spdc', sbi: true },
    { p: 'createdAt', o: 'EQUAL', a: '', sbi: false },
];

const po_Tinh = [
    { p: 'iID_MaTinh', o: 'IN', a: 'kspdc', sbi: true },
    { p: 'sTenTinh', o: 'IN', a: 'spdc', sbi: true },
];

module.exports = {
    po_BDS,
    po_KhachHang,
    po_Tinh,
};
