#!/bin/bash

echo "-------------------------------------------------"
echo "       Generate create tables queries file       "
echo "-------------------------------------------------"

# Source the .env file to set environment variables
if [ -f "./.env" ]; then
    source "./.env"
fi

# Default value if client_code is not set in .env
CLIENT_CODE=${CLIENT_CODE:-"dev"}
CLICKHOUSE_DATABASE=${CLICKHOUSE_DATABASE:-"landstock"}

# SQL script file
SQL_FILE="./queries/create-tables/${CLIENT_CODE}_tbs.sql"

# Overwrite the file if it already exists
if [ -f "$SQL_FILE" ]; then
	rm "$SQL_FILE"
	touch "$SQL_FILE"
fi

# echo "USE ${CLICKHOUSE_DATABASE};" >> "$SQL_FILE"
# Function to create a table
create_table() {
    TABLE_NAME="${CLIENT_CODE}_${1}"
    echo "CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (" >> "$SQL_FILE"
    echo "    sID UUID DEFAULT generateUUIDv4() NOT NULL," >> "$SQL_FILE"
    
    case $1 in
        "BDS")
            echo "    sMa String NOT NULL," >> "$SQL_FILE"
            echo "    sNoiDung String NOT NULL," >> "$SQL_FILE"
            echo "    sTenTinh String NOT NULL," >> "$SQL_FILE"
            echo "    iID_MaTinh Int64 NOT NULL," >> "$SQL_FILE"
            echo "    sTenQuan String NOT NULL," >> "$SQL_FILE"
            echo "    iID_MaQuan Int64 NOT NULL," >> "$SQL_FILE"
            echo "    sTenPhuongXa String," >> "$SQL_FILE"
            echo "    iID_MaPhuongXa Int64," >> "$SQL_FILE"
            echo "    sTenDuong String NOT NULL," >> "$SQL_FILE"
            echo "    sLoaiHang String," >> "$SQL_FILE"
            echo "    iDienTich Decimal(6, 1)," >> "$SQL_FILE"
            echo "    iSoTang Decimal(4, 1)," >> "$SQL_FILE"
            echo "    iMatTien Decimal(4, 1)," >> "$SQL_FILE"
            echo "    iGiaChaoHopDong Int64," >> "$SQL_FILE"
            echo "    sGiaChaoHopDong String," >> "$SQL_FILE"
            echo "    sHuongNha String," >> "$SQL_FILE"
            echo "    iID_HuongNha Int32," >> "$SQL_FILE"
            echo "    iSoPhongNgu Int32," >> "$SQL_FILE"
            echo "    iSoToilet Int32," >> "$SQL_FILE"
            echo "    sMoTa String NOT NULL," >> "$SQL_FILE"
            # Uncomment the following line if you want to include the 'sFiles' Array(String)
            # echo "    sFiles Array(String)," >> "$SQL_FILE"
            echo "    sAvatar String," >> "$SQL_FILE"
            echo "    sLat String," >> "$SQL_FILE"
            echo "    sLng String," >> "$SQL_FILE"
            echo "    sHotline FixedString(10)," >> "$SQL_FILE"
            echo "    dNgayTao DateTime," >> "$SQL_FILE"
        ;;
        "Tinh")
            echo "    sTenTinh String NOT NULL," >> "$SQL_FILE"
            echo "    iID_MaTinh Int64 NOT NULL," >> "$SQL_FILE"
        ;;
        "Quan")
            echo "    sTenQuan String NOT NULL," >> "$SQL_FILE"
            echo "    iID_MaQuan Int64 NOT NULL," >> "$SQL_FILE"
            echo "    iID_MaTinh Int64 NOT NULL," >> "$SQL_FILE"
        ;;
        "PhuongXa")
            echo "    sTenPhuongXa String NOT NULL," >> "$SQL_FILE"
            echo "    iID_MaPhuongXa Int64 NOT NULL," >> "$SQL_FILE"
            echo "    iID_MaQuan Int64 NOT NULL," >> "$SQL_FILE"
        ;;
        "LoaiHang")
            echo "    sCode String," >> "$SQL_FILE"
            echo "    sTen String," >> "$SQL_FILE"
        ;;
        "KhachHang")
            echo "    sTen String," >> "$SQL_FILE"
            echo "    sDienThoai String NOT NULL," >> "$SQL_FILE"
            echo "    sEmail String," >> "$SQL_FILE"
            echo "    iTrangThai Int32," >> "$SQL_FILE"
			echo "    sTrangThai String," >> "$SQL_FILE"
            echo "    sMa String," >> "$SQL_FILE"
			echo "    sSuKien String," >> "$SQL_FILE"
        ;;
        "HuongNha")
            echo "    iID_HuongNha Int64," >> "$SQL_FILE"
            echo "    sHuongNha String," >> "$SQL_FILE"
        ;;
        "HinhAnh")
            echo "    sMa String NOT NULL," >> "$SQL_FILE"
            echo "    iID_HinhAnh Int64 NOT NULL," >> "$SQL_FILE"
            echo "    sFile String NOT NULL," >> "$SQL_FILE"
            echo "    sFile_Thums String," >> "$SQL_FILE"
            echo "    dNgayTao DateTime," >> "$SQL_FILE"
        ;;
    esac
    
    echo "    createdAt DateTime DEFAULT now() NOT NULL" >> "$SQL_FILE"
    echo ") ENGINE = MergeTree() ORDER BY createdAt;" >> "$SQL_FILE"
    echo "" >> "$SQL_FILE"
}

# Create tables
create_table "Tinh"
create_table "Quan"
create_table "PhuongXa"
create_table "LoaiHang"
create_table "KhachHang"
create_table "HuongNha"
create_table "HinhAnh"
create_table "BDS"
