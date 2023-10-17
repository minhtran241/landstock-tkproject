CREATE TABLE tb_Quan (
	sID UUID DEFAULT generateUUIDv4(),
	iID_MaQuan Int64 NOT NULL,
	sTenQuan String,
	iID_MaTinh Int64,
	createdAt DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY createdAt;