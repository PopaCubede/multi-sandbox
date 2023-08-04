import crypto from 'crypto';
import { AddressDto, SolrAddress } from '../definition/Address';

export const signAddress = (address: AddressDto): SolrAddress => {
    const signature = crypto
        .createHmac('sha256', 'Vincent2020')
        .update(JSON.stringify([address]))
        .digest('hex');

    const solrAddress: SolrAddress = { ...address, signature };

    return solrAddress;
};
