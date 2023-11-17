CREATE TABLE tb_HuongNha (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	iID_HuongNha Int64,
	sHuongNha String,
	createdAt DateTime DEFAULT now() NOT NULL,
) ENGINE = MergeTree()
ORDER BY createdAt;