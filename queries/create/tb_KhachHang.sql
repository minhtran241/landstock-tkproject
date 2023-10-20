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