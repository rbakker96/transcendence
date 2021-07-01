import axios from "axios";

export default class UserAPI {
  static findName(userID: number) {
    return axios.get('users/findName',
      {
        params: {
          userID: userID,
        },
      });
  }
}
