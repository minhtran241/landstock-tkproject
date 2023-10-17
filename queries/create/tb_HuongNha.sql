CREATE TABLE tb_HuongNha (
	sID UUID DEFAULT generateUUIDv4(),
	sCode Int64,
	sTen String,
	createdAt DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY createdAt;