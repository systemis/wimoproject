import mongoose, {ClientSession} from 'mongoose';
import IUserDB from './interfaces/user-db';
import User from '../entities/user';
import IUser from '../entities/interfaces/user';

export default function makeUserDb({
    userDbModel, 
} : {
    userDbModel: mongoose.Model<IUser & mongoose.Document, Record<string, unknown>>;
}) : IUserDB {
    return new (class MongooseUserDb implements IUserDB {
        async findAll():Promise<User[]> {
            const existing = await userDbModel
                .find()
                .limit(2000)
                .lean({ virtuals: true });
            if (existing) {
                // get all user
                return existing.map((user) => new User(user));
            }
            return []; 
        }; 
        async findByEmail({email}: {email: string}):Promise<User | null> {
            const query_conditions = { email };
            const existing = await userDbModel  
                .findOne(query_conditions)
                .lean({ virtuals: true} );
            if(existing) {
                return new User(existing);
            }
            return null; 
        }; 
        async update(updatePayload: Partial<IUser>, options?: { session?: ClientSession }): Promise<User | null> {
            return null; 
        }; 
        async insert(payload: IUser, options?: { session?: ClientSession }) : Promise<User | null> {
            const updated_payload = payload;
            const result = await userDbModel.create([updated_payload], options);
            const existing = await userDbModel  
                .findOne({ _id: result[0]._id})
                .lean({ virtuals: true} );
            if(existing) {
                return new User(existing);
            }
            
            return null; 
        }
    }); 
}