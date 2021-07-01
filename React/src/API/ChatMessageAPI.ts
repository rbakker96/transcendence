import axios from "axios";

export default class ChatMessageAPI {
  static getAllChatMessages() {
    return axios.get('chatMessage');
  }
}
