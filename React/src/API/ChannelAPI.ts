import axios from "axios";
import { Channel } from "../models/Channel.model";
import { ChannelUser } from "../models/ChannelUser.model";

export interface ChannelCreate {
  name: string;
  admin: number;
  users: ChannelUser[];
}

export type ChannelUpdate = ChannelCreate;

export default class ChannelAPI {


  static async show(id: number) {
    return await axios.get(`http://localhost:8000/api/channels`, {
      params: {
        channelID: id,
      }
    });
  }

  static async getOne(channelId : number) {
    return await axios.get(`http://localhost:8000/api/channels/one` , {
      params: {
        channelID: channelId,
      }
    });
  }
  static async create(body: ChannelCreate): Promise<Channel> {
    return await axios.post("channels", body);
  }

  static async update(channel: Channel, body: ChannelUpdate): Promise<Channel> {
    return await axios.post(`channels/${channel.Id}`, body);
  }

  static async destroy(channel: Channel): Promise<void> {
    return await axios.delete(`channels/${channel.Id}`);
  }

  static async findName(channelID: number) {
    return await axios.get("channels/findName", {
      params: {
        channelID: channelID,
      },
    });
  }

  static async leaveChannel(userID: number, channelID : number) {
      return await axios.post("channels/remove", {
        userId: userID,
        channelId: channelID
      })
  }

  static async login(password :string, channelID: number) {
    return await axios.post("channels/login", {
      password : password,
      channelId : channelID
    })
  }

  static async getAll(userId : number)
  {
    return await axios.get('channels', {
      params: {userId : userId}
    })
  }

  static async getChannelUsers(channelID : number)
  {
    return await axios.get('channels/channel-users', {
      params: {id : channelID}
    })
  }

  static async getWithUser(userID : number)
  {
    return await axios.get('channels/test', {
      params: {id : userID}
    })
  }

  static async getIsAdmin(userID : number, activeChannelID : number)
  {
    return await axios.get('channels/is-admin', {
      params: {
        userId : userID,
        channelId: activeChannelID}
    })
  }

  static async getState(userID : number, activeChannelID : number)
  {
    return await axios.get('channels/get-state', {
      params: {
        userId : userID,
        channelId: activeChannelID}
    })
  }

  static async changeState(newState : number, channelId : number, userId: number)
  {
    return await axios.patch('channels/change-state', {
        newState: newState,
        channelId: channelId,
        userId: userId
    })
  }

  static async changePassword(newPassword : string, channelId: number)
  {
    return await axios.patch('channels/change-password', {
        newPassword: newPassword,
        channelId: channelId
    })
  }
}

