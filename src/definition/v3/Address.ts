import Address from 'rtech-struct/definition/address-book/v3/Address';
import AddressFilter from 'rtech-struct/definition/address-book/v3/AddressFilter';
import AdminAddressFilter from 'rtech-struct/definition/address-book/v3/AdminAddressFilter';
import InputAddress from 'rtech-struct/definition/address-book/v3/InputAddress';
import PaginatedAddresses from 'rtech-struct/definition/address-book/v3/PaginatedAddress';
import { array, defaulted, integer, number, object, optional, size, string } from 'superstruct';
import { CommonError } from '../Error';
import { EmailStruct, TimezoneStruct, UuidStruct, ZuluDateTimeStruct } from '../utils';
const { v4: uuidV4 } = require('uuid');

const ScoreStruct = object({
    id: defaulted(UuidStruct, () => uuidV4()),
    value: integer(),
    created_at: ZuluDateTimeStruct,
    updated_at: ZuluDateTimeStruct,
});

const ContactStruct = object({
    id: defaulted(UuidStruct, () => uuidV4()),
    company: optional(size(string(), 1, 128)),
    phone_number: optional(size(string(), 1, 32)),
    email: optional(size(EmailStruct, 2, 128)),
    name: optional(size(string(), 1, 64)),
    scores: array(ScoreStruct),
    created_at: ZuluDateTimeStruct,
    updated_at: ZuluDateTimeStruct,
});

const PositionStruct = object({
    lat: size(number(), -90, 90),
    lon: size(number(), -180, 180),
});

const InputAddressStruct = object({
    id: optional(defaulted(UuidStruct, () => uuidV4())),
    alias: optional(size(string(), 1, 64)),
    street: size(string(), 1, 128),
    additional_street: optional(size(string(), 1, 128)),
    city: size(string(), 1, 64),
    zip_code: size(string(), 2, 32),
    province: optional(size(string(), 1, 128)),
    country: size(string(), 2, 2),
    position: PositionStruct,
    timezone: TimezoneStruct,
    created_at: optional(ZuluDateTimeStruct),
    updated_at: optional(ZuluDateTimeStruct),
});


const AddressStruct = object({
    id: UuidStruct,
    alias: optional(size(string(), 1, 64)),
    street: size(string(), 1, 128),
    additional_street: optional(size(string(), 1, 128)),
    city: size(string(), 1, 64),
    zip_code: optional(size(string(), 2, 32)),
    province: optional(size(string(), 1, 128)),
    country: size(string(), 2, 2),
    position: PositionStruct,
    timezone: TimezoneStruct,
    contacts: optional(array(ContactStruct)),
    scores: optional(array(ScoreStruct)),
    created_at: ZuluDateTimeStruct,
    updated_at: ZuluDateTimeStruct,
});

const AddressRollbackableStruct = object({
    id: UuidStruct,
    alias: optional(size(string(), 1, 64)),
    street: size(string(), 1, 128),
    additional_street: optional(size(string(), 1, 128)),
    city: size(string(), 1, 64),
    zip_code: optional(size(string(), 2, 32)),
    province: optional(size(string(), 1, 128)),
    country: size(string(), 2, 2),
    position: PositionStruct,
    timezone: TimezoneStruct,
    contacts: optional(array(ContactStruct)),
    scores: optional(array(ScoreStruct)),
    created_at: ZuluDateTimeStruct,
    updated_at: ZuluDateTimeStruct,
    signature_for_rollback: string(),
});

type PaginationFilters = {
    from?: number,
    size?: number,
    sort?: string[]
};

interface AddressService {
    createAddress: (entityId: string, groupId: string, data: InputAddress) => Promise<Address | CommonError>;
    getAddress: (entityId: string, addressId: string) => Promise<Address | CommonError>;
    updateAddress: (entityId: string, addressId: string, data: InputAddress) => Promise<Address | CommonError>;
    deleteAddress: (entityId: string, addressId: string) => Promise<Address | CommonError>;
    searchAddress: (entityId: string,
        query: string,
        pagination?: PaginationFilters,
        filters?: AddressFilter[] | AdminAddressFilter[]
    ) => Promise<{
        data: PaginatedAddresses[]
    }>;
}

interface AddressAdminService {
    createAddressAdmin: (groupId: string, data: InputAddress) => Promise<Address | CommonError>;
    getAddressAdmin: (addressId: string) => Promise<Address | CommonError>;
    updateAddressAdmin: (addressId: string, data: InputAddress) => Promise<Address | CommonError>;
    deleteAddressAdmin: (addressId: string) => Promise<Address | CommonError>;
    searchAddressAdmin: (entityId: string,
        query: string,
        pagination?: PaginationFilters,
        filters?: AddressFilter[] | AdminAddressFilter[]
    ) => Promise<{
        data: PaginatedAddresses[]
    }>;
}

export {
    AddressAdminService, AddressRollbackableStruct, AddressService, AddressStruct, ContactStruct,
    InputAddressStruct
};
