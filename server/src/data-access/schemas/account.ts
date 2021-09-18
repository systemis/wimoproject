import mongoose from 'mongoose';
const Schema = mongoose.Schema; 

const accountSchema = new Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true }, 
    posts: [{type: String, required: true}]
}, { timestamps: true })

export default accountSchema