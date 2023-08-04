import Group from 'rtech-struct/definition/address-book/v3/Group';
import InputGroup from 'rtech-struct/definition/address-book/v3/InputGroup';
import { array, object, optional, size, string } from 'superstruct';
import { ZuluDateTimeStruct } from '../utils';

const InputGroupStruct = object({
    id: string(),
    members: array(size(string(), 1, 64)),
    created_at: optional(ZuluDateTimeStruct),
    updated_at: optional(ZuluDateTimeStruct),
});

const GroupStruct = object({
    id: size(string(), 1, 64),
    members: array(size(string(), 1, 64)),
    created_at: ZuluDateTimeStruct,
    updated_at: ZuluDateTimeStruct,
});

interface GroupService {
    createGroupAdmin: (data: InputGroup) => Promise<Group | number>;
    getGroupAdmin: (groupId: string) => Promise<Group | null>;
    updateGroupAdmin: (groupId: string, data: InputGroup) => Promise<Group | null>;
    deleteGroupAdmin: (groupId: string) => Promise<Group | null>;
}

export { GroupService, GroupStruct, InputGroupStruct };
