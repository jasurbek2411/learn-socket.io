import { Request, Response } from 'express'

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, username, password, confirPassword, gender } = req.body
    } catch (error) {

    }
}
export const login = async (req: Request, res: Response) => { }

export const logout = async (req: Request, res: Response) => { }