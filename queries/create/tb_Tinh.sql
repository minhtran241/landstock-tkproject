CREATE TABLE tb_Tinh (
	sID UUID DEFAULT generateUUIDv4(),
	iID_MaTinh Int64 NOT NULL,
	sTenTinh String,
	createdAt DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY createdAt;