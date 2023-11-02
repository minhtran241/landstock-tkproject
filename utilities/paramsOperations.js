'use strict';

// For each param: p: param name, o: operator, a: action, sbi: select by id
// Action involves the following: k = primary key, s = select, p = post, d = delete, c: in condition (where clause)

const po_BDS = [
    { p: 'sID', t: 'string', o: '=', a: 'si' },
    { p: 'sMa', t: 'string', o: '=', a: 'spdci', k: true },
    { p: 'sNoiDung', t: 'string', o: 'LIKE', a: 'spi' },
    { p: 'sTenTinh', t: 'string', o: 'LIKE', a: 'spi' },
    { p: 'iID_MaTinh', t: 'number', o: 'IN', a: 'spdci' },
    { p: 'sTenQuan', t: 'string', o: 'LIKE', a: 'spi' },
    { p: 'iID_MaQuan', t: 'number', o: 'IN', a: 'spdci' },
    { p: 'sTenPhuongXa', t: 'string', o: 'LIKE', a: 'pi' },
    { p: 'iID_MaPhuongXa', t: 'number', o: 'IN', a: 'pi' },
    { p: 'sTenDuong', t: 'string', o: 'LIKE', a: 'pi' },
    { p: 'sLoaiHang', t: 'string', o: 'LIKEAND', a: 'pdci' },
    { p: 'iDienTich', t: 'number', o: 'BETWEEN', a: 'spdci' },
    { p: 'iSoTang', t: 'number', o: 'BETWEEN', a: 'spci' },
    { p: 'iMatTien', t: 'number', o: 'BETWEEN', a: 'pdci' },
    { p: 'iGiaChaoHopDong', t: 'number', o: 'BETWEEN', a: 'pdci' },
    { p: 'sGiaChaoHopDong', t: 'string', o: 'LIKE', a: 'spi' },
    { p: 'sHuongNha', t: 'string', o: 'LIKE', a: 'pi' },
    { p: 'iID_HuongNha', t: 'number', o: 'IN', a: 'pdci' },
    { p: 'iSoPhongNgu', t: 'number', o: 'IN', a: 'pdci' },
    { p: 'iSoToilet', t: 'number', o: 'IN', a: 'pdci' },
    { p: 'sMoTa', t: 'string', o: 'LIKE', a: 'pi' },
    { p: 'sFiles', t: 'string', o: 'LIKE', a: 'pi' },
    { p: 'sAvatar', t: 'string', o: 'LIKE', a: 'sp' },
    { p: 'sLat', t: 'string', o: 'LIKE', a: 'pi' },
    { p: 'sLng', t: 'string', o: 'LIKE', a: 'pi' },
    { p: 'sHotline', t: 'string', o: 'IN', a: 'spi' },
    { p: 'dNgayTao', t: 'date', o: 'BETWEEN', a: '' },
    { p: 'createdAt', t: 'string', o: '=', a: '' },
];

const po_KhachHang = [
    { p: 'sID', t: 'string', o: '=', a: 'si' },
    { p: 'sTen', t: 'string', o: 'LIKE', a: 'spi' },
    { p: 'sDienThoai', t: 'string', o: '=', a: 'spdci' },
    { p: 'sEmail', t: 'string', o: 'LIKE', a: 'spdci' },
    { p: 'iTrangThai', t: 'number', o: 'IN', a: 'spdci' },
    { p: 'sMa', t: 'string', o: 'LIKE', a: 'spdci', k: true },
    { p: 'createdAt', t: 'date', o: '=', a: '' },
];

const po_Tinh = [
    { p: 'sID', t: 'string', o: '=', a: '' },
    { p: 'iID_MaTinh', t: 'number', o: 'IN', a: 'spdci', k: true },
    { p: 'sTenTinh', t: 'string', o: 'IN', a: 'spi' },
    { p: 'createdAt', t: 'date', o: '=', a: '' },
];

const po_Quan = [
    { p: 'sID', t: 'string', o: '=', a: '' },
    { p: 'iID_MaQuan', t: 'number', o: 'IN', a: 'spdci', k: true },
    { p: 'sTenQuan', t: 'string', o: 'IN', a: 'spi' },
    { p: 'iID_MaTinh', t: 'number', o: 'IN', a: 'spdci' },
    { p: 'createdAt', t: 'date', o: '=', a: '' },
];

const po_PhuongXa = [
    { p: 'sID', t: 'string', o: '=', a: '' },
    { p: 'iID_MaPhuongXa', t: 'number', o: 'IN', a: 'spdci', k: true },
    { p: 'sTenPhuongXa', t: 'string', o: 'IN', a: 'spi' },
    { p: 'iID_MaQuan', t: 'number', o: 'IN', a: 'spdci' },
    { p: 'createdAt', t: 'date', o: '=', a: '' },
];

const po_HuongNha = [
    { p: 'sID', t: 'string', o: '=', a: '' },
    { p: 'iID_HuongNha', t: 'number', o: 'IN', a: 'spdci', k: true },
    { p: 'sHuongNha', t: 'string', o: 'IN', a: 'spi' },
    { p: 'createdAt', t: 'date', o: '=', a: '' },
];

const po_LoaiHang = [
    { p: 'sID', t: 'string', o: '=', a: '' },
    { p: 'sCode', t: 'string', o: 'IN', a: 'spdci', k: true },
    { p: 'sTen', t: 'string', o: 'IN', a: 'spi' },
    { p: 'createdAt', t: 'date', o: '=', a: '' },
];

// const po_Func = [
//     { p: 'count', t: 'number' },
//     { p: 'sum', t: 'number' },
//     { p: 'avg', t: 'number' },
//     { p: 'min', t: 'number' },
//     { p: 'max', t: 'number' },
// ];

module.exports = {
    po_BDS,
    po_KhachHang,
    po_Tinh,
    po_Quan,
    po_PhuongXa,
    po_HuongNha,
    po_LoaiHang,
    // po_Func,
};
