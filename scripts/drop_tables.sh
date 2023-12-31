#!/bin/bash

echo "-----------------------------------------------"
echo "  Execute ClickHouse Table Deletion Script     "
echo "-----------------------------------------------"

# Source the .env file to set environment variables
if [ -f "./.env" ]; then
    source "./.env"
fi

# Default values if variables are not set in .env
CLIENT_CODE=${CLIENT_CODE:-"dev"}
CLICKHOUSE_DATABASE=${CLICKHOUSE_DATABASE:-"landstock"}
CLICKHOUSE_USER=${CLICKHOUSE_USER:-"default"}
CLICKHOUSE_PASSWORD=${CLICKHOUSE_PASSWORD:-"default"}

# Table names (array)
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

echo "Deleting tables from ClickHouse..."

for i in "${!TABLE_NAMES[@]}"; do
    TABLE_NAME="${CLIENT_CODE}_${TABLE_NAMES[$i]}"
    
    echo "DROP TABLE IF EXISTS ${CLICKHOUSE_DATABASE}.${TABLE_NAME}"
    clickhouse-client --user=${CLICKHOUSE_USER} --password=${CLICKHOUSE_PASSWORD} -q "DROP TABLE IF EXISTS ${CLICKHOUSE_DATABASE}.${TABLE_NAME}"
done

echo "Table deletion completed."
