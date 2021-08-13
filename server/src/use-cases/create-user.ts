import User from "../entities/user";
import IUser from "../entities/interfaces/user";
import IUserDB from "../data-access/interfaces/user-db";

export type ICreateUser = ({payload}: {payload: IUser}) => Promise<User | null>; 
export default function makeCreateUser(userDb: IUserDB):ICreateUser{
    return async function createUser({payload} : {payload: IUser}): Promise<User | null> {
        const updated = await userDb.insert(payload);
        return updated; 
    }
}