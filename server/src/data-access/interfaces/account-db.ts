import IAccount from "../../entities/interfaces/account";
import Account from "../../entities/account";
import { ClientSession } from 'mongoose'

export default interface IAccountDB {
    findAll: () => Promise<Account[] | null>
    findByEmail: ({email}: {email: string}) => Promise<Account | null>
    insert: (account: IAccount, options?: {session?: ClientSession}) => Promise<Account | null>
}

