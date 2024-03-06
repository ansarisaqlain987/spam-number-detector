import { CONFIG } from "../config";
import {DataTypes, Model, ModelAttributes} from 'sequelize';


interface User {
    id?: string;
    phone: string;
    password: string;
    email?: string;
    name?: string;
}
const schema: ModelAttributes<Model<User, any>> = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}
export const UserModel = CONFIG.db.instance.define('user', schema, {
    timestamps: true
});