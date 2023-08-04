import { readFileSync } from 'fs';
import { join } from 'path';
import {
    Infer,
    object,
    string,
} from 'superstruct';

const configFile: AppConfig = JSON.parse(
    (readFileSync(join(__dirname, 'config.json'))).toString(),
);

const appConfig = object({
    address_book_v3: object({
        baseUrl: string(),
        index: string(),
        authKey: string(),
    }),
    address_book_to_get_from: object({
        url: string(),
        Authorization: string(),
        dbName: string(),
    }),
    address_book_to_insert_to: object({
        url: string(),
        Authorization: string(),
        dbName: string(),
    }),
});

type AppConfig = Infer<typeof appConfig>;

const getConfig = (): AppConfig => configFile;

export { getConfig, appConfig, AppConfig };
