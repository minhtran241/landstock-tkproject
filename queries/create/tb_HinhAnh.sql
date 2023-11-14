CREATE TABLE tb_HinhAnh (
	sID UUID DEFAULT generateUUIDv4() NOT NULL,
	sMa String NOT NULL, -- Foreign key to tb_BDS
	iID_HinhAnh Int64 NOT NULL,
	sFile String NOT NULL,
	sFileThumb String,
	dNgayTao DateTime,
	createdAt DateTime DEFAULT now() NOT NULL
) ENGINE = MergeTree()
ORDER BY createdAt;