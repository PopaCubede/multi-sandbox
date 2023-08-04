#!/bin/bash
/opt/docker-solr/scripts/precreate-core address-book-v3 /solr_data
solr -f -p 8983
# Adjust ownership and permissions
chown -R solr:solr /var/solr/data/address-book-v3
# Execute the CMD from the Dockerfile
exec "$@"
