import { ContactModel } from "./contact.model";
import { UserModel } from './user.model'

const UserContacts = UserModel.hasMany(ContactModel);
const ContactUser = ContactModel.belongsTo(UserModel);

const models = {
    user: UserModel,
    contact: ContactModel
}

const relations = {
    userContacts: UserContacts,
    contactUser: ContactUser
}

export {
    models,
    relations  
}