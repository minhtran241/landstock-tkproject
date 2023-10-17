CREATE TABLE tb_LoaiHang (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	sCode String,
	sTen String,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;