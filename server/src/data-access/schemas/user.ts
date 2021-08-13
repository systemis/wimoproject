import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const userSchema = new Schema(
    {
        first_name: { type: String, required: true, trim: true}, 
        last_name: { type: String, required: true, trim: true}, 
        email: { type: String, required: true, trim: true}, 
        mobile_phone: { type: String, required: true, trim: true}, 
    }, 
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        autoCreate: true,
    }
)

export default userSchema;