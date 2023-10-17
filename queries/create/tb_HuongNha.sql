CREATE TABLE tb_HuongNha (
	sID UUID DEFAULT generateUUIDv4(),
	iID_HuongNha Int64,
	sHuongNha String,
	createdAt DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY createdAt;