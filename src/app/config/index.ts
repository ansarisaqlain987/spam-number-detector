import { DB_INSTANCE } from './db.config';
import { ENV_VARS } from './env.config';

DB_INSTANCE.sync()
export const CONFIG = {
    env: ENV_VARS,
    db: {
        instance: DB_INSTANCE
    }
}