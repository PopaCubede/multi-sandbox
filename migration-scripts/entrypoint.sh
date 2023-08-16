#!/bin/bash

# Wait for Solr to start
RETRY_COUNT=0
MAX_RETRIES=15  # Adjust as needed
until $(curl --output /dev/null --silent --head --fail http://address-book-solr:8983/solr/admin/ping) || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
    printf '.'
    sleep 10  # Increased sleep duration
    RETRY_COUNT=$((RETRY_COUNT+1))
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "Solr did not start after waiting for a long time. Continuing."
    # exit 1
fi

mkdir -p /var/solr/data/address-book

# Adjust ownership and permissions
chown -R solr:solr /var/solr
chown -R solr:solr /var/solr/data
chown -R solr:solr /var/solr/data/address-book

# Check if the 'address-book' core already exists
if [ ! -d "/opt/solr/server/solr/address-book" ]; then
    # Create the 'address-book' core
    solr create -c address-book -d /var/solr/data/address-book

    # Import data into the 'address-book' core (adjust path as needed)
    /opt/solr/bin/post -c address-book /var/solr/data/address-book/data.json
fi

# Load schema (This is a placeholder, you might need to adjust based on how you want to use the schema.json with Solr's Config API)
curl "http://address-book-solr:8983/solr/address-book/config" -d '@/var/solr/data/address-book/schema.json'

# Post data to Solr
/opt/solr/bin/post -c address-book /var/solr/data/address-book/data.json

# Start Solr in the foreground
exec solr-foreground
