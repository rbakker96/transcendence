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
  static index(id : number) {
    return axios.get("http://localhost:8000/api/channels/one", {
      params: {
        Id : id,
      },
    });
  }

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

  static getAdmins(channelID : number, userID: number) {
    console.log("ChannelID in api", channelID);
    console.log("userID in api", userID);
      return axios.get("channels/admins", {
        params: {
          channelID: channelID,
          userID: userID,
        }
      })
  }
}
