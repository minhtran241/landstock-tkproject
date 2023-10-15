CREATE OR REPLACE TABLE bds (
		id UInt64 PRIMARY KEY AUTO_INCREMENT,
		sMa String,
		sNoiDung Nullable(String),
		sTenTinh String NOT NULL,
		iID_MaTinh Int64 NOT NULL,
		sTenQuan String NOT NULL,
		iID_MaQuan Int64 NOT NULL,
		sTenPhuongXa Nullable(String),
		iID_MaPhuongXa Nullable(Int64),
		sTenDuong String NOT NULL,
		sLoaiHang Nullable(String),
		iDienTich Decimal(6, 1) NOT NULL,
		iSoTang Decimal(4, 1) NOT NULL,
		iMatTien Decimal(4, 1) NOT NULL,
		iGiaChaoHopDong Int64 NOT NULL,
		sGiaChaoHopDong String NOT NULL,
		sHuongNha Nullable(String),
		iID_HuongNha Nullable(Int32),
		iSoPhongNgu Nullable(Int32),
		iSoToilet Nullable(Int32),
		sMoTa String NOT NULL,
		sFiles Array(String) NOT NULL,
		sLat String NOT NULL,
		sLng String NOT NULL,
		sHotline FixedString(10) NOT NULL,
		dNgayTao DateTime,
		CONSTRAINT sNoiDung_max_length CHECK length(sNoiDung) <= 200,
		CONSTRAINT iDienTich_max CHECK iDienTich <= 999.999,
		CONSTRAINT iSoTang_max CHECK iSoTang <= 100.0,
		CONSTRAINT iMatTien_max CHECK iMatTien <= 100.0,
		CONSTRAINT iGiaChaoHopDong_max CHECK iGiaChaoHopDong <= 999999999999999,
		CONSTRAINT iSoPhongNgu_max CHECK iSoPhongNgu <= 100,
		CONSTRAINT iSoToilet_max CHECK iSoToilet <= 100,
		CONSTRAINT sMoTa_max_length CHECK length(sMoTa) <= 1000,
		CONSTRAINT sFiles_min_length CHECK length(sFiles) >= 3,
	) ENGINE = MergeTree PARTITION BY toYYYYMM(dNgayTao) -- Partition by year and month
ORDER BY id;