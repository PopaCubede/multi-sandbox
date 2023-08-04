import { v4 as uuidv4 } from 'uuid';
import { SolrAddress } from '../../src/definition/Address';
import { ElasticDocGroupRollbackable } from '../../src/definition/v3/ElasticDoc';

const convertSolrToES = (solrAddress: SolrAddress): ElasticDocGroupRollbackable => {
    const now = new Date().toISOString()
    const elasticDocGroup: ElasticDocGroupRollbackable = {
        groupId: solrAddress.owner,
        members: [solrAddress.owner],
        addresses: [
            {
                id: uuidv4(),
                alias: solrAddress.alias,
                street: solrAddress.address_street,
                additional_street: solrAddress.address_additional_street,
                city: solrAddress.address_city,
                zip_code: solrAddress.address_zip_code,
                province: solrAddress.address_province,
                country: solrAddress.address_country,
                position: {
                    lat: parseFloat(solrAddress.address_position.split(',')[0]),
                    lon: parseFloat(solrAddress.address_position.split(',')[1]),
                },
                timezone: solrAddress.address_timezone_string,
                contacts: [
                    {
                        id: uuidv4(),
                        company: solrAddress.contact_company,
                        phone_number: solrAddress.contact_phone_number,
                        email: solrAddress.contact_email,
                        name: solrAddress.contact_name,
                        scores: [],
                        created_at: now,
                        updated_at: now,
                    },
                ],
                scores: [],
                created_at: now,
                updated_at: now,
                signature_for_rollback: solrAddress.signature
            },
        ],
        created_at: now,
        updated_at: now
    };

    return elasticDocGroup;
};

export { convertSolrToES };
