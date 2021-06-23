import axios from "axios";
import {Channel} from '../Models/Channel.model'
import {ChannelUser} from "../Models/ChannelUser.model";

export interface ChannelCreate {
    name: string
    admin: number
    users : ChannelUser[]
}

export type ChannelUpdate = ChannelCreate

export default class ChannelAPI {
    static index() : Promise<Array<Channel>> {
        return axios.get('channels');
    }

    static show(id: number) : Promise<Channel> {
        return axios.get('channels/${id}')
    }

    static create(body: ChannelCreate) : Promise<Channel> {
        return axios.post('channels', body)
    }

    static update(channel: Channel, body: ChannelUpdate): Promise<Channel> {
        return axios.post('channels/${channel.id}', body)
    }

    static destroy(channel: Channel) : Promise<void> {
        return axios.delete('channels/${channel.id}')
    }
}