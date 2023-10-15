CREATE TABLE huongnha (
	sCode Int64 PRIMARY KEY,
	sTen String NOT NULL,
) ENGINE = MergeTree()
ORDER BY sCode;