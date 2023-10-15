CREATE TABLE quan (
	iID_MaQuan Int64 PRIMARY KEY,
	sTenTinh String NOT NULL,
) ENGINE = MergeTree()
ORDER BY iID_MaQuan;