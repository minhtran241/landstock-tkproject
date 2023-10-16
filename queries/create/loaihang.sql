CREATE TABLE loaihang (sCode Int64, sTen String NOT NULL) ENGINE = MergeTree() PRIMARY KEY sCode
ORDER BY sCode;