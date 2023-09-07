import moment from 'moment-timezone';
import { Infer, define, pattern, string } from 'superstruct';
const isUuid = require('is-uuid');

const isEmail = <T>() =>
    define<T>('EmailStruct', (value: unknown): value is T => {
        if (typeof value !== 'string') {
            return false;
        }
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return emailRegex.test(value);
    });

const EmailStruct = isEmail<string>();

const UuidStruct = define<string>('UuidStruct', isUuid.v4);

const isTimezone = <T>() =>
    define<T>('TimezoneStruct', (value: unknown): value is T => {
        if (typeof value !== 'string') {
            return false;
        }
        return moment.tz.zone(value) !== null;
    });

const TimezoneStruct = isTimezone<string>();

const isoReg: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|(\+|\-)\d{2}:?\d{2})$/;
const zdReg = /^(?<dateTime>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(\.\d{3})?Z$/;

const isoDate = () => {
    return pattern(string(), isoReg);
};

const ZuluDateTimeStruct = define<string>('ZuluDateTimeStruct', (date) => {
    try {
        const rgResult = zdReg.exec(date as string);

        if (rgResult === null) {
            return false;
        }

        return (new Date(date as string)).toISOString()
            .includes((rgResult.groups as { [key: string]: string }).dateTime);
    } catch (error) {
        return false;
    }
});

type Email = Infer<typeof EmailStruct>; // string
type Uuid = Infer<typeof UuidStruct>; // string
type Timezone = Infer<typeof TimezoneStruct>; // string
type ZuluDateTimeType = Infer<typeof ZuluDateTimeStruct>; // string

// eslint-disable-next-line max-len
export { Email, EmailStruct, Timezone, TimezoneStruct, Uuid, UuidStruct, ZuluDateTimeStruct, ZuluDateTimeType, isoDate };
