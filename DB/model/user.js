import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    confirmEmail: {
        type: Boolean,
        default: false
    },
    age: Number,
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})
export const userModel = mongoose.model('user', userSchema)