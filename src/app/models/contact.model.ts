import { CONFIG } from "../config";
import {DataTypes, Model, ModelAttributes} from 'sequelize';


interface Contact {
    id?: string;
    userId: string;
    phone: string;
    email?: string;
    name?: string;
}
const schema: ModelAttributes<Model<Contact, any>> = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    phone: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
}
export const ContactModel = CONFIG.db.instance.define('contact', schema, {
    timestamps: true
});