'use strict';

// For each param: p: param name, o: operator, a: action, sbi: select by id
// Action involves the following: k = primary key, s = select, p = post, d = delete, c: in condition (where clause)

const po_BDS = [
    { p: 'sID', o: 'EQUAL', a: 'ks', sbi: true },
    { p: 'sMa', o: 'EQUAL', a: 'sdc', sbi: true },
    { p: 'sNoiDung', o: 'LIKE', a: 'sp', sbi: true },
    { p: 'sTenTinh', o: 'LIKE', a: 'p', sbi: true },
    { p: 'iID_MaTinh', o: 'IN', a: 'pdc', sbi: true },
    { p: 'sTenQuan', o: 'LIKE', a: 'p', sbi: true },
    { p: 'iID_MaQuan', o: 'IN', a: 'pdc', sbi: true },
    { p: 'sTenPhuongXa', o: 'LIKE', a: 'p', sbi: true },
    { p: 'iID_MaPhuongXa', o: 'IN', a: 'p', sbi: true },
    { p: 'sTenDuong', o: 'LIKE', a: 'p', sbi: true },
    { p: 'sLoaiHang', o: 'LIKEAND', a: 'pdc', sbi: true },
    { p: 'iDienTich', o: 'BETWEEN', a: 'spdc', sbi: true },
    { p: 'iSoTang', o: 'BETWEEN', a: 's', sbi: true },
    { p: 'iMatTien', o: 'BETWEEN', a: 'pdc', sbi: true },
    { p: 'iGiaChaoHopDong', o: 'BETWEEN', a: 'pdc', sbi: true },
    { p: 'sGiaChaoHopDong', o: 'LIKE', a: 'sp', sbi: true },
    { p: 'sHuongNha', o: 'LIKE', a: 'p', sbi: true },
    { p: 'iID_HuongNha', o: 'IN', a: 'pdc', sbi: true },
    { p: 'iSoPhongNgu', o: 'IN', a: 'pdc', sbi: true },
    { p: 'iSoToilet', o: 'IN', a: 'pdc', sbi: true },
    { p: 'sMoTa', o: 'LIKE', a: 'p', sbi: true },
    { p: 'sFiles', o: 'LIKE', a: 'p', sbi: true },
    { p: 'sAvatar', o: 'LIKE', a: 'sp', sbi: false },
    { p: 'sLat', o: 'LIKE', a: 'p', sbi: true },
    { p: 'sLng', o: 'LIKE', a: 'p', sbi: true },
    { p: 'sHotline', o: 'IN', a: 'sp', sbi: true },
    { p: 'dNgayTao', o: 'BETWEEN', a: '', sbi: false },
    { p: 'createdAt', o: 'EQUAL', a: '', sbi: false },
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
    { p: 'sID', o: 'EQUAL', a: '', sbi: false },
    { p: 'iID_MaTinh', o: 'IN', a: 'kspdc', sbi: true },
    { p: 'sTenTinh', o: 'IN', a: 'sp', sbi: true },
    { p: 'createdAt', o: 'EQUAL', a: '', sbi: false },
];

const po_Quan = [
    { p: 'sID', o: 'EQUAL', a: '', sbi: false },
    { p: 'iID_MaQuan', o: 'IN', a: 'kspdc', sbi: true },
    { p: 'sTenQuan', o: 'IN', a: 'sp', sbi: true },
    { p: 'iID_MaTinh', o: 'IN', a: 'spdc', sbi: true },
    { p: 'createdAt', o: 'EQUAL', a: '', sbi: false },
];

const po_PhuongXa = [
    { p: 'sID', o: 'EQUAL', a: '', sbi: false },
    { p: 'iID_MaPhuongXa', o: 'IN', a: 'kspdc', sbi: true },
    { p: 'sTenPhuongXa', o: 'IN', a: 'sp', sbi: true },
    { p: 'iID_MaQuan', o: 'IN', a: 'spdc', sbi: true },
    { p: 'createdAt', o: 'EQUAL', a: '', sbi: false },
];

const po_HuongNha = [
    { p: 'sID', o: 'EQUAL', a: '', sbi: false },
    { p: 'iID_HuongNha', o: 'IN', a: 'kspdc', sbi: true },
    { p: 'sHuongNha', o: 'IN', a: 'sp', sbi: true },
    { p: 'createdAt', o: 'EQUAL', a: '', sbi: false },
];

const po_LoaiHang = [
    { p: 'sID', o: 'EQUAL', a: '', sbi: false },
    { p: 'sCode', o: 'IN', a: 'kspdc', sbi: true },
    { p: 'sTen', o: 'IN', a: 'sp', sbi: true },
    { p: 'createdAt', o: 'EQUAL', a: '', sbi: false },
];

module.exports = {
    po_BDS,
    po_KhachHang,
    po_Tinh,
    po_Quan,
    po_PhuongXa,
    po_HuongNha,
    po_LoaiHang,
};
