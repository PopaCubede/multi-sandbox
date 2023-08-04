import { Client, HttpConnection, estypes } from '@elastic/elasticsearch';
import { ElasticDocGroupRollbackable } from '../../src/definition/v3/ElasticDoc';
import { getConfig } from '../Config';

const config = getConfig();

const esClient = new Client({
    node: config.address_book_v3.baseUrl,
    auth: {
        apiKey: config.address_book_v3.authKey,
    },
    Connection: HttpConnection
});

export const getESDocs = async (from: number, size: number): Promise<ElasticDocGroupRollbackable[]> => {
    try {
        const body: estypes.SearchResponse = await esClient.search<ElasticDocGroupRollbackable>({
            index: config.address_book_v3.index,
            from,
            size,
        });

        console.log('Search --- body:', body);

        return body.hits.hits.map((hit: any) => ({ ...hit._source }));
    } catch (error) {
        console.error(`Failed to fetch docs from ES: ${error}`);
        return [];
    }
};
