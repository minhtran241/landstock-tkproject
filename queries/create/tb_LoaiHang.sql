CREATE TABLE tb_LoaiHang (
	sID UUID DEFAULT generateUUIDv4(),
	sCode Int64,
	sTen String,
	createdAt DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY createdAt;