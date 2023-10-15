CREATE TABLE phuongxa (
	iID_MaPhuongXa Int64 PRIMARY KEY,
	sTenPhuongXa String NOT NULL,
) ENGINE = MergeTree()
ORDER BY iID_MaPhuongXa;