CREATE TABLE phuongxa (
	iID_MaPhuongXa Int64 NOT NULL,
	sTenPhuongXa String NOT NULL
) ENGINE = MergeTree() PRIMARY KEY iID_MaPhuongXa
ORDER BY iID_MaPhuongXa;