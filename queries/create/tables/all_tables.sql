CREATE TABLE tb_Tinh (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	iID_MaTinh Int64 NOT NULL,
	sTenTinh String,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;

CREATE TABLE tb_Quan (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	iID_MaQuan Int64 NOT NULL,
	sTenQuan String,
	iID_MaTinh Int64,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;

CREATE TABLE tb_PhuongXa (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	iID_MaPhuongXa Int64 NOT NULL,
	sTenPhuongXa String,
	iID_MaQuan Int64,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;

CREATE TABLE tb_LoaiHang (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	sCode String,
	sTen String,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;

CREATE TABLE tb_KhachHang (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	sTen String,
	sDienThoai String NOT NULL,
	sEmail String,
	iTrangThai Int32,
	sMa String,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;

CREATE TABLE tb_HuongNha (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	iID_HuongNha Int64,
	sHuongNha String,
	createdAt DateTime DEFAULT now() NOT NULL,
) ENGINE = MergeTree()
ORDER BY createdAt;

CREATE TABLE tb_HinhAnh (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	sMa String NOT NULL, -- Foreign key to tb_BDS
	iID_HinhAnh Int64 NOT NULL,
	sFile String NOT NULL,
	sFile_Thums String,
	dNgayTao DateTime,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;

CREATE OR REPLACE TABLE tb_BDS (
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
		-- sFiles Array(String),
		sAvatar String,
		sLat String,
		sLng String,
		sHotline FixedString(10),
		dNgayTao DateTime,
		createdAt DateTime DEFAULT now() NOT NULL
	) ENGINE = MergeTree PRIMARY KEY createdAt PARTITION BY toYYYYMM(createdAt);