import makeUserDb from "./make-user-db";
import makeAccountDB from "./make-account-db";

import { UserModel, AccountModel } from './models';
const UserDb = makeUserDb({userDbModel: UserModel});
const AccountDB = makeAccountDB({accountDbModel: AccountModel});
export {
    UserDb, 
    AccountDB
};