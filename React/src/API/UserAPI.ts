import axios from "axios";

export default class UserAPI {
  static async findName(userID: number) {
    return await axios.get("users/findName", {
      params: {
        userID: userID,
      },
    });
  }

  static async getActiveUser() {
    return await axios.get("users/getActiveUser");
  }
}
