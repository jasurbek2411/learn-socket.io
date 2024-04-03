import mongoose, { Mongoose, Schema } from 'mongoose'



const userSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    gender: {
        type: String,
        require: true,
        enum: ['male', "female"]
    },
    profilePicture: {
        type: String,
        default: ''
    }
})

const User = mongoose.model("User", userSchema)

export default User