CREATE TABLE tb_Quan (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	iID_MaQuan Int64 NOT NULL,
	sTenQuan String,
	iID_MaTinh Int64,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;