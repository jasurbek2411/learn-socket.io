import mongoose from "mongoose"

const connectToMongo = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        console.log('Connect ot database!')
    } catch (error) {
        const e = error as Error
        console.log(e.message)
    }
}

export default connectToMongo