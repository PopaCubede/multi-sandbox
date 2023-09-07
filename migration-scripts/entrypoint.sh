#!/bin/bash

if [ ! -d "/opt/solr/server/solr/address-book" ]; then
    # Create the 'address-book' core
    /opt/docker-solr/scripts/precreate-core address-book /solr_data/address-book-schema
    echo "Created core"
fi

echo "Starting solr"

/var/solr/seed_collection.sh &

exec solr-foreground
