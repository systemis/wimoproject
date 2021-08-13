import User from "../entities/user";
import IUserDB from "../data-access/interfaces/user-db";

export type IGetUsers = () => Promise<User[] | null> 

export default function makeGetUsers(userDB: IUserDB):IGetUsers{
    return async function() : Promise<User[] | null> {
        const users = userDB.findAll(); 
        return users;
    };
}