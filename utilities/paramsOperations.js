'use strict';

// For each param: p: param name, o: operator, a: action, sbi: select by id
// Action involves the following: k = primary key, s = select, p = post, d = delete, c: in condition (where clause)

const po_BDS = [
    { p: 'sID', o: '=', a: 'si', k: true, t: 'string' },
    { p: 'sMa', o: '=', a: 'sdci', k: false, t: 'string' },
    { p: 'sNoiDung', o: 'LIKE', a: 'spi', k: false, t: 'string' },
    { p: 'sTenTinh', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'iID_MaTinh', o: 'IN', a: 'pdci', k: false, t: 'number' },
    { p: 'sTenQuan', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'iID_MaQuan', o: 'IN', a: 'pdci', k: false, t: 'number' },
    { p: 'sTenPhuongXa', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'iID_MaPhuongXa', o: 'IN', a: 'pi', k: false, t: 'number' },
    { p: 'sTenDuong', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'sLoaiHang', o: 'LIKEAND', a: 'pdci', k: false, t: 'string' },
    { p: 'iDienTich', o: 'BETWEEN', a: 'spdci', k: false, t: 'number' },
    { p: 'iSoTang', o: 'BETWEEN', a: 'si', k: false, t: 'number' },
    { p: 'iMatTien', o: 'BETWEEN', a: 'pdci', k: false, t: 'number' },
    { p: 'iGiaChaoHopDong', o: 'BETWEEN', a: 'pdci', k: false, t: 'number' },
    { p: 'sGiaChaoHopDong', o: 'LIKE', a: 'spi', k: false, t: 'string' },
    { p: 'sHuongNha', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'iID_HuongNha', o: 'IN', a: 'pdci', k: false, t: 'number' },
    { p: 'iSoPhongNgu', o: 'IN', a: 'pdci', k: false, t: 'number' },
    { p: 'iSoToilet', o: 'IN', a: 'pdci', k: false, t: 'number' },
    { p: 'sMoTa', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'sFiles', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'sAvatar', o: 'LIKE', a: 'sp', k: false, t: 'string' },
    { p: 'sLat', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'sLng', o: 'LIKE', a: 'pi', k: false, t: 'string' },
    { p: 'sHotline', o: 'IN', a: 'spi', k: false, t: 'string' },
    { p: 'dNgayTao', o: 'BETWEEN', a: '', k: false, t: 'date' },
    { p: 'createdAt', o: '=', a: '', k: false, t: 'string' },
];

const po_KhachHang = [
    { p: 'sID', o: '=', a: 'si', k: true, t: 'string' },
    { p: 'sTen', o: 'LIKE', a: 'spi', k: false, t: 'string' },
    { p: 'sDienThoai', o: '=', a: 'spdci', k: false, t: 'string' },
    { p: 'sEmail', o: 'LIKE', a: 'spdci', k: false, t: 'string' },
    { p: 'iTrangThai', o: 'IN', a: 'spdci', k: false, t: 'number' },
    { p: 'sMa', o: 'LIKE', a: 'spdci', k: false, t: 'string' },
    { p: 'createdAt', o: '=', a: '', k: false, t: 'date' },
];

const po_Tinh = [
    { p: 'sID', o: '=', a: '', k: false, t: 'string' },
    { p: 'iID_MaTinh', o: 'IN', a: 'spdci', k: true, t: 'number' },
    { p: 'sTenTinh', o: 'IN', a: 'spi', k: false, t: 'string' },
    { p: 'createdAt', o: '=', a: '', k: false, t: 'date' },
];

const po_Quan = [
    { p: 'sID', o: '=', a: '', k: false, t: 'string' },
    { p: 'iID_MaQuan', o: 'IN', a: 'spdci', k: true, t: 'number' },
    { p: 'sTenQuan', o: 'IN', a: 'spi', k: false, t: 'string' },
    { p: 'iID_MaTinh', o: 'IN', a: 'spdci', k: false, t: 'number' },
    { p: 'createdAt', o: '=', a: '', k: false, t: 'date' },
];

const po_PhuongXa = [
    { p: 'sID', o: '=', a: '', k: false, t: 'string' },
    { p: 'iID_MaPhuongXa', o: 'IN', a: 'spdci', k: true, t: 'number' },
    { p: 'sTenPhuongXa', o: 'IN', a: 'spi', k: false, t: 'string' },
    { p: 'iID_MaQuan', o: 'IN', a: 'spdci', k: false, t: 'number' },
    { p: 'createdAt', o: '=', a: '', k: false, t: 'date' },
];

const po_HuongNha = [
    { p: 'sID', o: '=', a: '', k: false, t: 'string' },
    { p: 'iID_HuongNha', o: 'IN', a: 'spdci', k: true, t: 'number' },
    { p: 'sHuongNha', o: 'IN', a: 'spi', k: false, t: 'string' },
    { p: 'createdAt', o: '=', a: '', k: false, t: 'date' },
];

const po_LoaiHang = [
    { p: 'sID', o: '=', a: '', k: false, t: 'string' },
    { p: 'sCode', o: 'IN', a: 'spdci', k: true, t: 'string' },
    { p: 'sTen', o: 'IN', a: 'spi', k: false, t: 'string' },
    { p: 'createdAt', o: '=', a: '', k: false, t: 'date' },
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
