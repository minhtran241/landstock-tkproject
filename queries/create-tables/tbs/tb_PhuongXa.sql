CREATE TABLE tb_PhuongXa (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	iID_MaPhuongXa Int64 NOT NULL,
	sTenPhuongXa String,
	iID_MaQuan Int64,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;