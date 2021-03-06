import axios from "axios";

export default class UserAPI {
  static async findName(userID: number) {
    return await axios.get("users/findName", {
      params: {
        userID: userID,
      },
    });
  }

  static async getActiveUserID() {
    return await axios.get("users/getActiveUserID");
  }

  static async getUserData() {
    return await axios.get("userData");
  }

  static async getChannels(userID : number) {
    return await axios.get("users/channels", {
      params: {
        id: userID,
      }
    });
  }

  static async getChannelID(userID : number) {
    return await axios.get("users/channelID", {
      params: {
        id: userID,
      }
    });
  }


}
