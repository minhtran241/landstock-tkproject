CREATE TABLE tb_Tinh (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	iID_MaTinh Int64 NOT NULL,
	sTenTinh String,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;