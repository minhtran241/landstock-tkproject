'use strict';

// For each param: p: param name, o: operator, a: action, sbi: select by id
// Action involves the following: k = primary key, s = select, p = post, d = delete, c: in condition (where clause)

const po_HinhAnh = [
    { p: 'sID', t: 'string', o: '=', a: '', clht: 'String' },
    { p: 'sMa', t: 'string', o: '=', a: 'pc', k: true, clht: 'String' },
    { p: 'iID_HinhAnh', t: 'number', o: 'IN', a: 'spci', clht: 'Int64' },
    { p: 'sFile', t: 'string', o: 'LIKE', a: 'spi', clht: 'String' },
    { p: 'sFile_Thums', t: 'string', o: 'LIKE', a: 'spi', clht: 'String' },
    { p: 'dNgayTao', t: 'date', o: 'BETWEEN', a: '', clht: 'DateTime' },
    { p: 'createdAt', t: 'string', o: '=', a: '', clht: 'DateTime' },
];

const po_BDS = [
    { p: 'sID', t: 'string', o: '=', a: 'si', clht: 'String' },
    { p: 'sMa', t: 'string', o: '=', a: 'spci', k: true, clht: 'String' },
    { p: 'sNoiDung', t: 'string', o: 'LIKE', a: 'spi', clht: 'String' },
    { p: 'sTenTinh', t: 'string', o: 'LIKE', a: 'spi', clht: 'String' },
    { p: 'iID_MaTinh', t: 'number', o: 'IN', a: 'spci', clht: 'Int64' },
    { p: 'sTenQuan', t: 'string', o: 'LIKE', a: 'spi', clht: 'String' },
    { p: 'iID_MaQuan', t: 'number', o: 'IN', a: 'spci', clht: 'Int64' },
    { p: 'sTenPhuongXa', t: 'string', o: 'LIKE', a: 'pi', clht: 'String' },
    { p: 'iID_MaPhuongXa', t: 'number', o: 'IN', a: 'pci', clht: 'Int64' },
    { p: 'sTenDuong', t: 'string', o: 'LIKE', a: 'pi', clht: 'String' },
    { p: 'sLoaiHang', t: 'string', o: 'LIKEAND', a: 'pci', clht: 'String' },
    {
        p: 'iDienTich',
        t: 'number',
        o: 'BETWEEN',
        a: 'spci',
        clht: 'Decimal',
    },
    {
        p: 'iSoTang',
        t: 'number',
        o: 'BETWEEN',
        a: 'spci',
        clht: 'Decimal',
    },
    {
        p: 'iMatTien',
        t: 'number',
        o: 'BETWEEN',
        a: 'pci',
        clht: 'Decimal',
    },
    {
        p: 'iGiaChaoHopDong',
        t: 'number',
        o: 'BETWEEN',
        a: 'spci',
        clht: 'Int64',
    },
    { p: 'sGiaChaoHopDong', t: 'string', o: 'LIKE', a: 'spi', clht: 'String' },
    { p: 'sHuongNha', t: 'string', o: 'LIKE', a: 'pi', clht: 'String' },
    { p: 'iID_HuongNha', t: 'number', o: 'IN', a: 'pci', clht: 'Int32' },
    { p: 'iSoPhongNgu', t: 'number', o: 'IN', a: 'pci', clht: 'Int32' },
    { p: 'iSoToilet', t: 'number', o: 'IN', a: 'pci', clht: 'Int32' },
    { p: 'sMoTa', t: 'string', o: 'LIKE', a: 'pi', clht: 'String' },
    { p: 'sAvatar', t: 'string', o: 'LIKE', a: 'spi', clht: 'String' },
    { p: 'sLat', t: 'string', o: 'LIKE', a: 'pi', clht: 'String' },
    { p: 'sLng', t: 'string', o: 'LIKE', a: 'pi', clht: 'String' },
    { p: 'sHotline', t: 'string', o: 'IN', a: 'scpi', clht: 'FixedString(10)' },
    { p: 'dNgayTao', t: 'date', o: 'BETWEEN', a: '', clht: 'DateTime' },
    { p: 'createdAt', t: 'string', o: '=', a: '', clht: 'String' },
    // { p: 'sFiles', t: 'array', o: 'LIKE', a: 'pi' },
    {
        p: 'sFiles',
        t: 'array',
        o: null,
        a: 'pdi',
        isFile: true,
        po: po_HinhAnh,
        tbl: `${process.env.CLIENT_CODE}_HinhAnh`,
        clht: 'Array',
    },
];

const po_KhachHang = [
    { p: 'sID', t: 'string', o: '=', a: 'si', clht: 'String' },
    { p: 'sTen', t: 'string', o: 'LIKE', a: 'spi', clht: 'String' },
    { p: 'sDienThoai', t: 'string', o: '=', a: 'spci', clht: 'String' },
    { p: 'sEmail', t: 'string', o: 'LIKE', a: 'spci', clht: 'String' },
    { p: 'iTrangThai', t: 'number', o: 'IN', a: 'spci', clht: 'Int32' },
    { p: 'sTrangThai', t: 'string', o: 'IN', a: 'spi', clht: 'String' },
    { p: 'sMa', t: 'string', o: 'LIKE', a: 'spci', clht: 'String' },
    {
        p: 'sSuKien',
        t: 'string',
        o: 'LIKE',
        a: 'spci',
        k: true,
        clht: 'String',
    },
    { p: 'createdAt', t: 'date', o: '=', a: '', clht: 'DateTime' },
];

const po_Tinh = [
    { p: 'sID', t: 'string', o: '=', a: '', clht: 'String' },
    {
        p: 'iID_MaTinh',
        t: 'number',
        o: 'IN',
        a: 'spci',
        k: true,
        clht: 'Int64',
    },
    { p: 'sTenTinh', t: 'string', o: 'IN', a: 'spi', clht: 'String' },
    { p: 'createdAt', t: 'date', o: '=', a: '', clht: 'DateTime' },
];

const po_Quan = [
    { p: 'sID', t: 'string', o: '=', a: '', clht: 'String' },
    {
        p: 'iID_MaQuan',
        t: 'number',
        o: 'IN',
        a: 'spci',
        k: true,
        clht: 'Int64',
    },
    { p: 'sTenQuan', t: 'string', o: 'IN', a: 'spi', clht: 'String' },
    { p: 'iID_MaTinh', t: 'number', o: 'IN', a: 'spci', clht: 'Int64' },
    { p: 'createdAt', t: 'date', o: '=', a: '', clht: 'DateTime' },
];

const po_PhuongXa = [
    { p: 'sID', t: 'string', o: '=', a: '', clht: 'String' },
    {
        p: 'iID_MaPhuongXa',
        t: 'number',
        o: 'IN',
        a: 'spci',
        k: true,
        clht: 'Int64',
    },
    { p: 'sTenPhuongXa', t: 'string', o: 'IN', a: 'spi', clht: 'String' },
    { p: 'iID_MaQuan', t: 'number', o: 'IN', a: 'spci', clht: 'Int64' },
    { p: 'createdAt', t: 'date', o: '=', a: '', clht: 'DateTime' },
];

const po_HuongNha = [
    { p: 'sID', t: 'string', o: '=', a: '', clht: 'String' },
    {
        p: 'iID_HuongNha',
        t: 'number',
        o: 'IN',
        a: 'spci',
        k: true,
        clht: 'Int64',
    },
    { p: 'sHuongNha', t: 'string', o: 'IN', a: 'spi', clht: 'String' },
    { p: 'createdAt', t: 'date', o: '=', a: '', clht: 'DateTime' },
];

const po_LoaiHang = [
    { p: 'sID', t: 'string', o: '=', a: '', clht: 'String' },
    { p: 'sCode', t: 'string', o: 'IN', a: 'spci', k: true, clht: 'String' },
    { p: 'sTen', t: 'string', o: 'IN', a: 'spi', clht: 'String' },
    { p: 'createdAt', t: 'date', o: '=', a: '', clht: 'DateTime' },
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
    // po_HinhAnh,
    po_KhachHang,
    po_Tinh,
    po_Quan,
    po_PhuongXa,
    po_HuongNha,
    po_LoaiHang,
    // po_Func,
};
