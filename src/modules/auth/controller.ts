import User from '@/models/user.model'
import { Request, Response } from 'express'
import * as bcryptjs from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as mongoose from 'mongoose'

const secretKey = process.env.JWT_SECRET! || 'ffffdsfa342'


export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match!' })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "Username already exits " })
        }

        const hashPassword = await bcryptjs.hash(password, 4)

        const boyDefaultProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlDefaultProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePicture: gender === 'male' ? boyDefaultProfilePicture : girlDefaultProfilePicture
        })

        const tokens = generateTokens(newUser._id,)

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        })

        if (newUser) {
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePicture: newUser.profilePicture,
                accessToken: tokens.accessToken
            })
        } else {
            res.status(400).json({ error: "Invalid user data!" })
        }


    } catch (error) {
        const e = error as Error
        console.log('Error in signup controller', e.message)
        res.status(500).json({ error: 'Internal server error!' })

    }
}
export const login = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ error: 'User not found check your username' })
        }

        const checkPassword = bcryptjs.compare(password, user.password!)

        if (!checkPassword) {
            return res.status(404).json({ error: "pPassword is incorrect" })
        }

        const tokens = generateTokens(user._id)

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        })

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePicture: user.profilePicture,
            accessToken: tokens.accessToken
        })
    } catch (error) {
        const e = error as Error
        console.log(e.message)
        res.status(500).json('Internal server error')
    }


}

export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie("refreshToken", "", {
            maxAge: 0
        })
        res.status(200).json({ message: "Logged out successfully!" })
    } catch (error) {
        const e = error as Error
        console.log(e.message)
        res.status(500).json('Internal server error')
    }
}

const generateTokens = (userId: mongoose.Types.ObjectId) => {
    const accessToken = jwt.sign({ userId }, secretKey, {
        expiresIn: '1d',
    })
    const refreshToken = jwt.sign({ userId }, secretKey, {
        expiresIn: '7d',
    })

    return {
        accessToken, refreshToken
    }
}

export const generateAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies['refreshToken']
    const { userId } = jwt.verify(refreshToken, secretKey) as JwtPayload

    const user = await User.findById({ _id: userId })
    if (!user) {
        return res.status(404).json({ error: 'Invalid token!' })
    }

    const { accessToken } = generateTokens(user._id)

    res.status(200).json({ accessToken })

}