CREATE TABLE loaihang (sCode Int64 NOT NULL, sTen String NOT NULL) ENGINE = MergeTree() PRIMARY KEY sCode
ORDER BY sCode;