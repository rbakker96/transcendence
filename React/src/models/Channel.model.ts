
import {User} from './User.model'

export interface Channel {
    Id : number
    ChannelName : string
    IsPrivate : boolean
    IsDirect: boolean
    password?: string
    users: User[]
}
