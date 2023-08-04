import axios from 'axios';
import { SolrAddress } from '../../src/definition/Address';
import { getConfig } from '../Config';

const config = getConfig();

const solrClient = axios.create({
    baseURL: `${config.address_book_to_insert_to.url}/${config.address_book_to_insert_to.dbName}`,
});

export const insertToSolr = async (address: SolrAddress[]): Promise<void> => {
    try {
        await solrClient.post('/update/json/docs', address);
        await solrClient.post('/update', { commit: {} });
    } catch (error) {
        console.error('Error inserting to Solr:', error);
        throw error;
    }
};
