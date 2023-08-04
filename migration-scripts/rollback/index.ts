import { SolrAddress } from '../../src/definition/Address';
import { ElasticDocGroupRollbackable } from '../../src/definition/v3/ElasticDoc';
import { convertESToSolr } from './convertESToSolr';
import { getESDocs } from './getESDocs';
import { insertToSolr } from './insertToSolr';

const BATCH_SIZE = parseInt(process.argv[2]) || 100;

const main = async () => {
    let from = 0;
    let esDocs: ElasticDocGroupRollbackable[] = await getESDocs(from, BATCH_SIZE);

    while (esDocs.length > 0) {
        const solrAddresses: SolrAddress[] = [];
        esDocs.forEach((esDoc: ElasticDocGroupRollbackable) => {
            convertESToSolr(esDoc).forEach((solrAddress: SolrAddress) => {
                solrAddresses.push(solrAddress)
            })
        })
        await insertToSolr(solrAddresses);

        from += BATCH_SIZE;
        esDocs = await getESDocs(from, BATCH_SIZE);
    }
};

main()
    .then(() => console.log('Migration completed.'))
    .catch((err) => console.error(`Migration failed: ${err}`));
