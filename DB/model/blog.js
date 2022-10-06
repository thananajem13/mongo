import mongoose from 'mongoose'
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    price: { 
        type: Number, required: true }
        
}, {
    timestamps: true
})
export const blogModel = mongoose.model('Blog', blogSchema)