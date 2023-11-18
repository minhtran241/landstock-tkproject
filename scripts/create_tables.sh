#!/bin/bash

# Source the .env file to set environment variables
if [ -f "./.env" ]; then
    source "./.env"
fi

# Default value if client_code is not set in .env
CLIENT_CODE=${CLIENT_CODE:-"dev"}
CLICKHOUSE_PASSWORD=${CLICKHOUSE_PASSWORD:-"default"}

# SQL script file
SQL_FILE="./queries/create-tables/${CLIENT_CODE}_tbs.sql"

# Execute the script
clickhouse-client -n --password=${CLICKHOUSE_PASSWORD} < "$SQL_FILE"