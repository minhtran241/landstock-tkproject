CREATE TABLE quan (iID_MaQuan Int64, sTenQuan String NOT NULL) ENGINE = MergeTree() PRIMARY KEY iID_MaQuan
ORDER BY iID_MaQuan;