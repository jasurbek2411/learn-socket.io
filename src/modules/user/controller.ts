import User from '@/models/user.model'
import { Request, Response } from 'express'

export const getUsers = async (req: Request, res: Response) => {
    try {

        const userId = req.user?._id
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select('-password')

        return res.status(200).json(filteredUsers)

    } catch (error) {
        const e = error as Error
        console.log('Error in getUsers:', e.message)
        res.status(500).json({ error: 'Internal server error!' })
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const { username } = req.params

        const getUser = await User.find({ username: { $regex: new RegExp(`${username}`, 'i') } }).select('-password')
        if (!getUser) {
            return res.status(404).json({ error: 'User not found!' })
        }
        res.status(200).json(getUser)
    } catch (error) {
        const e = error as Error
        console.log('Error in getOne:', e.message)
        res.status(500).json({ error: 'Internal server error!' })
    }
}