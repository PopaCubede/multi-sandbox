#!/bin/bash

# Wait for Solr to start
until $(curl --output /dev/null --silent --head --fail http://localhost:8983/solr/admin/ping); do
    printf '.'
    sleep 5
done

# Load schema (This is a placeholder, you might need to adjust based on how you want to use the schema.json with Solr's Config API)
# curl "http://localhost:8983/solr/mycore/config" -d '@/opt/solr/server/solr/mycores/mycore/conf/schema.json'

# Post data to Solr
/opt/solr/bin/post -c mycore /opt/solr/server/solr/mycores/mycore/data/data.json

# Start Solr in the foreground
exec solr-foreground
