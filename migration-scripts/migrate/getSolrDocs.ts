import axios from 'axios';
import { SolrAddress } from '../../src/definition/Address';
import { getConfig } from '../Config';

const config = getConfig();
const solrClient = axios.create({
    baseURL: `${config.address_book_to_get_from.url}/${config.address_book_to_get_from.dbName}`,
    headers: {
        Authorization: config.address_book_to_get_from.Authorization,
    },
});

export const getSolrAddresses = async (start: number, rows: number): Promise<SolrAddress[]> => {
    try {
        const response = await solrClient.get(`/select?q=*:*&start=${start}&rows=${rows}`);
        return response.data.response.docs;
    } catch (error) {
        console.error('Error getting Solr addresses:', error);
        throw error;
    }
};
