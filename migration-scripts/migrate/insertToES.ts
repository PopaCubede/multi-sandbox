import { Client, HttpConnection } from '@elastic/elasticsearch';
import { MappingTypeMapping } from '@elastic/elasticsearch/lib/api/types';
import { ElasticDocGroup } from '../../src/definition/v3/ElasticDoc';
import { getConfig } from '../Config';
import defaultMappings from '../defaultMappings.json';

const config = getConfig();

const insertAddressesToES = async (
    elasticAddresses: ElasticDocGroup[],
) => {
    try {
        const bulkBody = elasticAddresses.flatMap((doc) => [
            {
                index: {
                    _index: config.address_book_v3.index,
                    _id: doc.groupId
                }
            },
            doc,
        ]);

        const esClient = new Client({
            node: config.address_book_v3.baseUrl,
            auth: {
                apiKey: config.address_book_v3.authKey,
            },
            Connection: HttpConnection,
        });

        const isDatastoreExist = await esClient.indices.exists({ index: config.address_book_v3.index });

        if (!isDatastoreExist) {
            await esClient.indices.create({
                index: config.address_book_v3.index,
                mappings: defaultMappings as MappingTypeMapping,
            });
        }

        const bulkResponse = await esClient.bulk({
            refresh: 'wait_for',
            pretty: true,
            body: bulkBody
        });

        console.log('\r\nBulk insertion response:\r\n', bulkResponse)

        if (bulkResponse.errors) {
            const erroredDocuments: any[] = [];
            bulkResponse.items.forEach((action: any, i: number) => {
                const operation = Object.keys(action)[0];
                if (action[operation].error) {
                    erroredDocuments.push({
                        status: action[operation].status,
                        error: action[operation].error,
                        operation: bulkBody[i * 2],
                        document: bulkBody[i * 2 + 1],
                    });
                }
            });
            console.log(erroredDocuments);
        }
    } catch (error: any) {
        console.error('\r\nBulk insertion error:\r\n', error)
    }
};

export { insertAddressesToES };
