import {User} from './User.model'
import {Channel} from './Channel.model'

export interface ChannelMessage {
    id: number
    content: string
    sender: User
    channel: Channel
    createdAt: Date
}