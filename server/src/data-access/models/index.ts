import mongoose from 'mongoose';

import IUser from '../../entities/interfaces/user';
import IAccount from '../../entities/interfaces/account';

import accountSchema from '../schemas/account'
import userSchema from '../schemas/user';

type IUserModel = IUser & mongoose.Document;
type IAccountModel = IAccount & mongoose.Document;

const UserModel = mongoose.model<IUserModel>('user', userSchema);
const AccountModel = mongoose.model<IAccountModel>('account', accountSchema);

export default Object.freeze({
    UserModel, 
    AccountModel, 
});

export {
    UserModel, 
    AccountModel
};