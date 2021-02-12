#!/usr/bin/env bash
set -e

ROOT=..
WEBSITE_DIR=..

# Clean the data dir
echo ">"
echo "> Cleaning data dir"
echo ">"
rm -rfv ${WEBSITE_DIR}/public/data/*

# Copy the dashboard data
echo ">"
echo "> Copying dashboard data"
echo ">"
mkdir ${WEBSITE_DIR}/public/data || true
cp -v -R ${ROOT}/library/* ${WEBSITE_DIR}/public/data

# Generate summary file
echo ">"
echo "> Generating data for use in website"
echo ">"
node generate.js "${ROOT}/library/"
echo "> Copying data file to website"
cp -v data.json ${WEBSITE_DIR}/public/data.json
