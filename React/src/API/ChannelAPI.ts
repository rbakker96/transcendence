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


  static show(id: number) {
    return axios.get(`http://localhost:8000/api/channels`, {
      params: {
        channelID: id,
      }
    });
  }

  static create(body: ChannelCreate): Promise<Channel> {
    return axios.post("channels", body);
  }

  static update(channel: Channel, body: ChannelUpdate): Promise<Channel> {
    return axios.post(`channels/${channel.Id}`, body);
  }

  static destroy(channel: Channel): Promise<void> {
    return axios.delete(`channels/${channel.Id}`);
  }

  static findName(channelID: number) {
    return axios.get("channels/findName", {
      params: {
        channelID: channelID,
      },
    });
  }

  static leaveChannel(userID: number, channelID : number) {
      return axios.post("channels/remove", {
        userId: userID,
        channelId: channelID
      })
  }

  static login(password :string, channelID: number) {
    return axios.post("channels/login", {
      password : password,
      channelId : channelID
    })
  }

  static getAll(userId : number)
  {
    return axios.get('channels', {
      params: {userId : userId}
    })
  }

  static getChannelUsers(channelID : number)
  {
    return axios.get('channels/channel-users', {
      params: {id : channelID}
    })
  }

  static getWithUser(userID : number)
  {
    return axios.get('channels/test', {
      params: {id : userID}
    })
  }

  static getIsAdmin(userID : number, activeChannelID : number)
  {
    return axios.get('channels/is-admin', {
      params: {
        userId : userID,
        channelId: activeChannelID}
    })
  }

  static changeState(newState : number, channelId : number, userId: number)
  {
    console.log("newState", newState)
    console.log("channelID", channelId)
    console.log("userId", userId)
    console.log("hier kom ik wel");
    return axios.patch('channels/change-state', {
        newState: newState,
        channelId: channelId,
        userId: userId
    })
  }
}

