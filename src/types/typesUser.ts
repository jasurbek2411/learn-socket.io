import { Types } from "mongoose"

export interface IUser {
    _id?: Types.ObjectId | null 
    fullName?: string | null
    username?: string | null
    password?: string | null
    gender?: string | null,
    profilePicture?: string | null
}