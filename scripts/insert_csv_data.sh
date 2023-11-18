#!/bin/bash

echo "-----------------------------------------------"
echo "  Execute ClickHouse Data Insertion Script     "
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
    "LoaiHang"
    "Tinh"
    "Quan"
    "PhuongXa"
    "HuongNha"
)

echo "Inserting data into ClickHouse tables..."

for i in "${!TABLE_NAMES[@]}"; do
    TABLE_NAME="${CLIENT_CODE}_${TABLE_NAMES[$i]}"
    CSV_FILE="${TABLE_NAMES[$i]}.csv"
    
    echo "INSERT INTO ${CLICKHOUSE_DATABASE}.${TABLE_NAME} FORMAT CSVWithNames" < "${CSV_FILE}"
    clickhouse-client --user=${CLICKHOUSE_USER} --password=${CLICKHOUSE_PASSWORD} -q "INSERT INTO ${CLICKHOUSE_DATABASE}.${TABLE_NAME} FORMAT CSVWithNames" < "${CSV_FILE}"
done

echo "Data insertion completed."
