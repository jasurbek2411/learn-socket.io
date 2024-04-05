import Converstation from '@/models/conversation.model'
import Message from '@/models/message.model'
import { IMessage } from '@/types/typesMessage'
import { Request, Response } from 'express'

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body as IMessage
        const { id: receiverId } = req.params
        const senderId = req.user?._id

        let conversation = await Converstation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Converstation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage)

    } catch (error) {
        const e = error as Error
        console.log('Error in sendMessage controller:', e.message)
        res.status(500).json({ error: "Internal server error!" })
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {

        const { id: userToChatId } = req.params
        const senderId = req.user?._id

        const conversation = await Converstation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages')

        if (!conversation) {
            return res.status(200).json([])
        }

        const messages = conversation?.messages

        res.status(200).json(messages)
    } catch (error) {
        const e = error as Error
        console.log('Error in getMessages controller:', e.message)
        res.status(500).json({ error: "Internal server error!" })
    }
}