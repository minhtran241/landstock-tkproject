USE landstock;
CREATE TABLE IF NOT EXISTS mb_Tinh (
    sID UUID DEFAULT generateUUIDv4() NOT NULL,
    sTenTinh String NOT NULL,
    iID_MaTinh Int64 NOT NULL,
    createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree() ORDER BY createdAt;

USE landstock;
CREATE TABLE IF NOT EXISTS mb_Quan (
    sID UUID DEFAULT generateUUIDv4() NOT NULL,
    sTenQuan String NOT NULL,
    iID_MaQuan Int64 NOT NULL,
    iID_MaTinh Int64 NOT NULL,
    createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree() ORDER BY createdAt;

USE landstock;
CREATE TABLE IF NOT EXISTS mb_PhuongXa (
    sID UUID DEFAULT generateUUIDv4() NOT NULL,
    sTenPhuongXa String NOT NULL,
    iID_MaPhuongXa Int64 NOT NULL,
    iID_MaQuan Int64 NOT NULL,
    createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree() ORDER BY createdAt;

USE landstock;
CREATE TABLE IF NOT EXISTS mb_LoaiHang (
    sID UUID DEFAULT generateUUIDv4() NOT NULL,
    sCode String,
    sTen String,
    createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree() ORDER BY createdAt;

USE landstock;
CREATE TABLE IF NOT EXISTS mb_KhachHang (
    sID UUID DEFAULT generateUUIDv4() NOT NULL,
    sTen String,
    sDienThoai String NOT NULL,
    sEmail String,
    iTrangThai Int32,
    sMa String,
    createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree() ORDER BY createdAt;

USE landstock;
CREATE TABLE IF NOT EXISTS mb_HuongNha (
    sID UUID DEFAULT generateUUIDv4() NOT NULL,
    iID_HuongNha Int64,
    sHuongNha String,
    createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree() ORDER BY createdAt;

USE landstock;
CREATE TABLE IF NOT EXISTS mb_HinhAnh (
    sID UUID DEFAULT generateUUIDv4() NOT NULL,
    sMa String NOT NULL,
    iID_HinhAnh Int64 NOT NULL,
    sFile String NOT NULL,
    sFile_Thums String,
    dNgayTao DateTime,
    createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree() ORDER BY createdAt;

USE landstock;
CREATE TABLE IF NOT EXISTS mb_BDS (
    sID UUID DEFAULT generateUUIDv4() NOT NULL,
    sMa String NOT NULL,
    sNoiDung String NOT NULL,
    sTenTinh String NOT NULL,
    iID_MaTinh Int64 NOT NULL,
    sTenQuan String NOT NULL,
    iID_MaQuan Int64 NOT NULL,
    sTenPhuongXa String,
    iID_MaPhuongXa Int64,
    sTenDuong String NOT NULL,
    sLoaiHang String,
    iDienTich Decimal(6, 1),
    iSoTang Decimal(4, 1),
    iMatTien Decimal(4, 1),
    iGiaChaoHopDong Int64,
    sGiaChaoHopDong String,
    sHuongNha String,
    iID_HuongNha Int32,
    iSoPhongNgu Int32,
    iSoToilet Int32,
    sMoTa String NOT NULL,
    sAvatar String,
    sLat String,
    sLng String,
    sHotline FixedString(10),
    dNgayTao DateTime,
    createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree() ORDER BY createdAt;

