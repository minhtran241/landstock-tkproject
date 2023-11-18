#!/bin/bash

# Source the .env file to set environment variables
if [ -f "./.env" ]; then
    source "./.env"
fi

# Default value if client_code is not set in .env
CLIENT_CODE=${CLIENT_CODE:-"dev"}
CLICKHOUSE_DATABASE=${CLICKHOUSE_DATABASE:-"landstock"}
CLICKHOUSE_USER=${CLICKHOUSE_USER:-"default"}
CLICKHOUSE_PASSWORD=${CLICKHOUSE_PASSWORD:-"default"}

# CSV files (array)
CSV_FILES=(
    "./data/csv/tb_LoaiHang.csv"
    "./data/csv/tb_Tinh.csv"
    "./data/csv/tb_Quan.csv"
    "./data/csv/tb_PhuongXa.csv"
    "./data/csv/tb_HuongNha.csv"
)

# table names (array)
TABLE_NAMES=(
    "LoaiHang"
    "Tinh"
    "Quan"
    "PhuongXa"
    "HuongNha"
)

for i in "${!CSV_FILES[@]}"; do
    echo "INSERT INTO landstock.tb_${TABLE_NAMES[$i]} FORMAT CSVWithNames" < "${CSV_FILES[$i]}"
    clickhouse-client --user=${CLICKHOUSE_USER} --password=${CLICKHOUSE_PASSWORD} -q "INSERT INTO ${CLICKHOUSE_DATABASE}.${CLIENT_CODE}_${TABLE_NAMES[$i]} FORMAT CSVWithNames" < "${CSV_FILES[$i]}"
done

# Ex: clickhouse-client --user=default --password=default -q "INSERT INTO landstock.tb_LoaiHang FORMAT CSVWithNames" < tb_LoaiHang.csv
