import { convertSolrToES } from './convertSolrToES';
import { getSolrAddresses } from './getSolrDocs';
import { insertAddressesToES } from './insertToES';

const BATCH_SIZE = process.argv[2] ? parseInt(process.argv[2], 10) : 100;

(async () => {
    let start = 0;
    let hasMoreData = true;

    while (hasMoreData) {
        const solrAddresses = await getSolrAddresses(start, BATCH_SIZE);

        if (solrAddresses.length === 0) {
            hasMoreData = false;
        } else {
            const elasticAddresses = solrAddresses.map(convertSolrToES);
            await insertAddressesToES(elasticAddresses);
            start += solrAddresses.length;
        }
    }

    console.log('Migration completed.');
})();
