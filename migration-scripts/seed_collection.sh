#!/bin/bash

RETRY_COUNT=0
MAX_RETRIES=15  # Adjust as needed
until $(curl --output /dev/null --silent --head --fail http://localhost:8983/solr/admin/ping) || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
    printf '.'
    sleep 10  # Increased sleep duration
    RETRY_COUNT=$((RETRY_COUNT+1))
done

/opt/solr/bin/post -c address-book /solr_data/data.json

echo "Injected data into solr"
