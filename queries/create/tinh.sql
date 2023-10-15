CREATE TABLE tinh (
	iID_MaTinh Int64 PRIMARY KEY,
	sTenTinh String NOT NULL,
) ENGINE = MergeTree()
ORDER BY iID_MaTinh;