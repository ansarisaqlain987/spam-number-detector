import {Sequelize, Options} from 'sequelize';
import { ENV_VARS } from './env.config';

const options: Options = {
    dialect: 'postgres',
    host: ENV_VARS.db_host,
    username: ENV_VARS.db_user,
    password: ENV_VARS.db_password,
    database: ENV_VARS.db_name,
    port: ENV_VARS.db_port,
    ssl: ENV_VARS.db_ssl
}
export const DB_INSTANCE = new Sequelize(options);