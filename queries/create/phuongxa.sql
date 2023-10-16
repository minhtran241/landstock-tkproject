CREATE TABLE phuongxa (
	iID_MaPhuongXa Int64,
	sTenPhuongXa String NOT NULL
) ENGINE = MergeTree() PRIMARY KEY iID_MaPhuongXa
ORDER BY iID_MaPhuongXa;