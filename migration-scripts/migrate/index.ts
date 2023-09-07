import { ElasticDocGroupRollbackable } from '../../src/definition/v3/ElasticDoc';
import { convertSolrToES } from './convertSolrToES';
import { getSolrAddresses } from './getSolrDocs';
import { insertAddressesToES } from './insertToES';

const BATCH_SIZE = process.argv[2] ? parseInt(process.argv[2], 10) : 100;

const mergeAddressesWithSameOwner = (addresses: ElasticDocGroupRollbackable[]) => {
    const temp: {
        [key: string]: ElasticDocGroupRollbackable;
    } = {};

    addresses.forEach((address) => {
        if (temp.hasOwnProperty(address.groupId)) {
            temp[address.groupId].addresses = temp[address.groupId].addresses.concat(address.addresses);
        } else {
            temp[address.groupId] = address;
        }
    });

    return Object.values(temp);
};

(async () => {
    let start = 0;
    let hasMoreData = true;

    while (hasMoreData) {
        const solrAddresses = await getSolrAddresses(start, BATCH_SIZE);

        if (solrAddresses.length === 0) {
            hasMoreData = false;
        } else {
            const elasticAddresses = solrAddresses.map(convertSolrToES);
            const mergedAddresses = mergeAddressesWithSameOwner(elasticAddresses);
            await insertAddressesToES(mergedAddresses);
            start += solrAddresses.length;
        }
    }

    console.log('Migration completed.');
})();
