FROM solr:8.9

USER root

COPY migration-scripts/entrypoint.sh /var/solr/entrypoint.sh

COPY migration-scripts/seed_collection.sh /var/solr/seed_collection.sh

RUN mkdir /solr_data && chown -R solr:solr /solr_data

COPY --chown=solr:solr migration-scripts/solr-replication/ /solr_data

RUN chown -R solr:solr /var/solr && chown -R solr:solr /opt/solr-8.9.0

RUN chmod +x /var/solr/entrypoint.sh && chmod +x /var/solr/seed_collection.sh

USER solr

ENTRYPOINT ["/bin/bash", "/var/solr/entrypoint.sh"]
