import {getNumberValueOrZero, getBooleanValue} from "../utils/converter.util";

const { DB_URL, DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_HOST, DB_SSL, KEY_JWT, KEY_SECRET } = process.env;

export const ENV_VARS = {
    db_host: DB_HOST,
    db_port: getNumberValueOrZero(DB_PORT),
    db_user: DB_USER,
    db_password: DB_PASS,
    db_ssl: getBooleanValue(DB_SSL),
    db_name: DB_NAME,
    jwt_secret: KEY_JWT,
    encryption_secret: KEY_SECRET ?? ''
}