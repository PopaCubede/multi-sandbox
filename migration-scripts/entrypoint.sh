#!/bin/bash

# Wait for Solr to start
until $(curl --output /dev/null --silent --head --fail http://localhost:8983/solr/admin/ping); do
    printf '.'
    sleep 5
done

# Load schema (This is a placeholder, you might need to adjust based on how you want to use the schema.json with Solr's Config API)
# curl "http://localhost:8983/solr/address-book/config" -d '@/opt/solr/server/solr/mycores/address-book/conf/schema.json'

# Post data to Solr
/opt/solr/bin/post -c address-book /opt/solr/server/solr/mycores/address-book/data/data.json

# Adjust ownership and permissions
chown -R solr:solr /var/solr/data/address-book

# Start Solr in the foreground
exec solr-foreground
