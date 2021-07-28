import axios from "axios";

type newMessageType = {
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

export default class ChatMessageAPI {
  static async getAllChatMessages() {
    return await axios.get("chatMessage");
  }

  static async getChannelMessages(id : number) {
    let url = 'chatMessage/' + id.toString();
    return await axios.get(url);
  }

  static async createChatMessage(new_message: newMessageType) {
    return await axios.post("chatMessage/newMessage", {
      channelID: new_message.channelID,
      senderID: new_message.senderID,
      messageContent: new_message.messageContent,
      messageTimestamp: new_message.messageTimestamp,
    });
  }
}
