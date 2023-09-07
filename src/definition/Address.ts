interface ShipperId {
    shipperId: string;
}

interface ShipperParams extends ShipperId {
    addressSignature: string;
}

interface AddressDto {
    owner: string;
    alias?: string;
    contact_company?: string;
    contact_phone_number?: string;
    contact_email?: string;
    contact_name?: string;
    address_additional_street?: string;
    address_country: string;
    address_province?: string;
    address_zip_code: string;
    address_city: string;
    address_street: string;
    address_position: string;
    address_timezone_string: string;
}

interface SolrAddress extends AddressDto {
    signature: string;
}

export { AddressDto, ShipperId, ShipperParams, SolrAddress };
