FROM solr:8.9

COPY entrypoint.sh /var/solr/entrypoint.sh

USER root
RUN mkdir /solr_data && chown -R solr:solr /solr_data

COPY --chown=solr:solr ./solr-replication/solr_data /solr_data
RUN chmod +x /var/solr/entrypoint.sh && chown -R solr:solr /var/solr && chown -R solr:solr /opt/solr-8.9.0

USER solr
ENTRYPOINT ["/bin/bash", "/opt/solr-init.sh"]
