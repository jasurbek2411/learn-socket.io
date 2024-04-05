import { Schema, model } from "mongoose";


const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        require: true,
        default: []
    }],
}, { timestamps: true })

const Converstation = model('Converstation', conversationSchema)
export default Converstation