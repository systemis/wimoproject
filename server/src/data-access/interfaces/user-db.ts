import User from '../../entities/user';
import IUser from '../../entities/interfaces/user';
import { ClientSession } from "mongoose";

export default interface IUserDB {
    findAll: () => Promise<User[]>; 
    findByEmail: 
        ({email}: {email: string}, options?: {session?: ClientSession}) => Promise<User | null>; 
    update: (updatePayload: Partial<IUser>, options?: { session?: ClientSession }) => Promise<User | null>;
    insert: (user: IUser, options?: { session?: ClientSession }) => Promise<User | null>;
}