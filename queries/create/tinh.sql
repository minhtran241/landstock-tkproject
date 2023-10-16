CREATE TABLE tinh (
	iID_MaTinh Int64 NOT NULL,
	sTenTinh String NOT NULL
) ENGINE = MergeTree()
ORDER BY iID_MaTinh PRIMARY KEY iID_MaTinh;