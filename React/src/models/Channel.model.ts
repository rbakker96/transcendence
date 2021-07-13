
import {User} from './User.model'
import {ChannelUser} from "./ChannelUser.model";


export interface Channel {
    ID : number
    Name : string
    admin : User
    users : ChannelUser[]
}