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

# table names (array)
TABLE_NAMES=(
    "BDS"
    "HinhAnh"
    "KhachHang"
    "LoaiHang"
    "Tinh"
    "Quan"
    "PhuongXa"
    "HuongNha"
)

# Execute the script
for i in "${!TABLE_NAMES[@]}"; do
    echo "DROP TABLE IF EXISTS ${CLICKHOUSE_DATABASE}.${CLIENT_CODE}_${TABLE_NAMES[$i]}"
    clickhouse-client --user=${CLICKHOUSE_USER} --password=${CLICKHOUSE_PASSWORD} -q "DROP TABLE IF EXISTS ${CLICKHOUSE_DATABASE}.${CLIENT_CODE}_${TABLE_NAMES[$i]}"
done