import _ from 'lodash'
import mongoose, {ClientSession} from 'mongoose'
import Account from '../entities/account'
import IAccountDB from './interfaces/account-db'
import IAccount from '../entities/interfaces/account'

export default function makeAccountDB({
    accountDbModel
}: {
    accountDbModel: mongoose.Model<IAccount & mongoose.Document, Record<string, unknown>>
}){
    return new (class MongooseAccountDB implements IAccountDB {
        async findAll() {
            const existing = await accountDbModel
                .find()
                .limit(2000)
                .lean({virtuals: true})
            if(existing) {
                const result = existing.map((account) => new Account(account))
                return result
            }

            return []
        }

        async findByEmail({email}: {email: string}) {
            const existing = await accountDbModel
                .findOne({email: email})
                .lean({virtuals: true})
            return existing ? new Account(existing) : null
        }

        async insert(payload: IAccount, options?: {session?: ClientSession}) {
            const result = await accountDbModel.create([payload], options)
            const existing = await accountDbModel
                .findOne({_id: _.get(result[0], 'id')})
                .lean({virtuals: true})
            return existing ? new Account(existing) : null
        }
    })
}