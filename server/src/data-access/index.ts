import makeUserDb from "./make-user-db";

import { UserModel } from './models';
const UserDb = makeUserDb({userDbModel: UserModel});
export {
    UserDb
};