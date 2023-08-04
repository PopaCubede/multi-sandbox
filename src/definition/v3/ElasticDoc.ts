import { Infer, array, object, optional, size, string } from 'superstruct';
import { CommonError } from '../Error';
import { ZuluDateTimeStruct } from '../utils';
import { AddressRollbackableStruct, AddressStruct } from './Address';

const ElasticDocGroupStruct = object({
    id: optional(size(string(), 1, 128)),
    groupId: size(string(), 1, 128),
    members: array(size(string(), 1, 128)),
    addresses: array(AddressStruct),
    created_at: ZuluDateTimeStruct,
    updated_at: ZuluDateTimeStruct,
});

type ElasticDocGroup = Infer<typeof ElasticDocGroupStruct>;

const ElasticDocGroupRollbackableStruct = object({
    id: optional(size(string(), 1, 128)),
    groupId: size(string(), 1, 128),
    members: array(size(string(), 1, 128)),
    addresses: array(AddressRollbackableStruct),
    created_at: ZuluDateTimeStruct,
    updated_at: ZuluDateTimeStruct,
});

type ElasticDocGroupRollbackable = Infer<typeof ElasticDocGroupRollbackableStruct>;

type SearchParameters = {
    es_query: unknown; // QueryDslQueryContainer, child in json tree. Can have deep-level structure.
    sort?: string | string[]; // child in json tree. Can have deep-level structure.
    aggs?: unknown; // Record<string, AggregationsAggregationContainer>,
    from?: number;
    size?: number;
};

type SearchResult = { totalFound: number; docs: ElasticDocGroup[] };

interface ElasticRepository {
    createElasticDoc: (data: ElasticDocGroup, entityId?: string) => Promise<CommonError | null>;
    updateElasticDoc: (
        data: ElasticDocGroup,
        groupId: string,
        entityId?: string
    ) => Promise<ElasticDocGroup | CommonError>;
    deleteElasticDoc: (groupId: string, entityId?: string) => Promise<ElasticDocGroup | CommonError>;
    getElasticDocById: (groupId: string) => Promise<ElasticDocGroup | CommonError.NOT_FOUND>;
    searchElasticDoc: (searchParams: SearchParameters) => Promise<SearchResult>;
}

export { ElasticDocGroup, ElasticDocGroupRollbackable, ElasticDocGroupStruct, ElasticRepository, SearchParameters };
