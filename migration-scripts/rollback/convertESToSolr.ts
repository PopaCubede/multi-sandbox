import { Infer } from 'superstruct';
import { AddressDto, SolrAddress } from '../../src/definition/Address';
import { AddressRollbackableStruct, ContactStruct } from '../../src/definition/v3/Address';
import { ElasticDocGroupRollbackable } from '../../src/definition/v3/ElasticDoc';
import { signAddress } from '../../src/service/addressBook';

type ElasticAddress = Infer<typeof AddressRollbackableStruct>;
type ElasticContact = Infer<typeof ContactStruct>;

export const convertESToSolr = (esDoc: ElasticDocGroupRollbackable): SolrAddress[] => {
    const solrAddresses: SolrAddress[] = [];

    esDoc.addresses.forEach((esAddress: ElasticAddress) => {
        if (esAddress.contacts) {
            esAddress.contacts?.forEach((esContact: ElasticContact) => {
                const solrAddress: SolrAddress = {
                    owner: esDoc.groupId,
                    alias: esAddress.alias,
                    contact_company: esContact.company,
                    contact_phone_number: esContact.phone_number,
                    contact_email: esContact.email,
                    contact_name: esContact.name,
                    address_additional_street: esAddress.additional_street,
                    address_country: esAddress.country,
                    address_province: esAddress.province,
                    address_zip_code: esAddress.zip_code ?? '',
                    address_city: esAddress.city,
                    address_street: esAddress.street,
                    address_position: `${esAddress.position.lat},${esAddress.position.lon}`,
                    address_timezone_string: esAddress.timezone,
                    signature: esAddress.signature_for_rollback ?? signAddress(
                        esAddress as unknown as AddressDto
                    ).signature,
                };
                solrAddresses.push(solrAddress)
            })
        } else {
            const solrAddress: SolrAddress = {
                owner: esDoc.groupId,
                alias: esAddress.alias,
                address_additional_street: esAddress.additional_street,
                address_country: esAddress.country,
                address_province: esAddress.province,
                address_zip_code: esAddress.zip_code ?? '',
                address_city: esAddress.city,
                address_street: esAddress.street,
                address_position: `${esAddress.position.lat},${esAddress.position.lon}`,
                address_timezone_string: esAddress.timezone,
                signature: esAddress.signature_for_rollback ?? signAddress(
                    esAddress as unknown as AddressDto
                ).signature,
            };
            solrAddresses.push(solrAddress)
        }
    })
    return solrAddresses
};
