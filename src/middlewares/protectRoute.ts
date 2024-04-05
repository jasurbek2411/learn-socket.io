import { JwtSecretKey } from '@/constants'
import User from '@/models/user.model'
import { IUser } from '@/types/typesUser'
import { NextFunction, Request, Response, } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const refreshToken = req.cookies['refreshToken']

        if (!refreshToken) {
            return res.status(404).json({ error: "Unauthorized - No token Provided" })
        }

        const verifyToken = jwt.verify(refreshToken, JwtSecretKey) as JwtPayload

        if (!verifyToken) {
            return res.status(404).json({ error: "Unauthorized - Invalid token" })
        }

        const user = await User.findById({ _id: verifyToken.userId }).select("-password")

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        req.user = user

        next()

    } catch (error) {
        const e = error as Error
        console.log("Error in protectRoute middleware:", e.message)
        res.status(500).json({ error: "Internal invalid server!", })
    }
}

export default protectRoute