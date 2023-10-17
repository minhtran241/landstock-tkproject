CREATE TABLE tb_PhuongXa (
	sID UUID DEFAULT generateUUIDv4(),
	iID_MaPhuongXa Int64 NOT NULL,
	sTenPhuongXa String,
	iID_MaQuan Int64,
	createdAt DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY createdAt;