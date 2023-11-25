#!/bin/bash

echo "-----------------------------------------------"
echo "  Execute ClickHouse Table Creation Script     "
echo "-----------------------------------------------"

# Source the .env file to set environment variables
if [ -f "./.env" ]; then
    source "./.env"
fi

# Default values if variables are not set in .env
CLIENT_CODE=${CLIENT_CODE:-"dev"}
CLICKHOUSE_USER=${CLICKHOUSE_USER:-"default"}
CLICKHOUSE_PASSWORD=${CLICKHOUSE_PASSWORD:-"default"}
CLICKHOUSE_DATABASE=${CLICKHOUSE_DATABASE:-"landstock"}

# SQL script file
SQL_FILE="./queries/create-tables/${CLIENT_CODE}_tbs.sql"

echo "USE ${CLICKHOUSE_DATABASE};" | cat - "$SQL_FILE" > temp && mv temp "$SQL_FILE"
SQL_FILE="./queries/create-tables/${CLIENT_CODE}_tbs.sql"

# Execute the script
echo "Executing ClickHouse Table Creation Script..."
clickhouse-client -n --user=${CLICKHOUSE_USER} --password=${CLICKHOUSE_PASSWORD} < "$SQL_FILE"

echo "Script execution completed."
