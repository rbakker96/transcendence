import axios from "axios";

type newMessageType = {
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

export default class ChatMessageAPI {
  static getAllChatMessages() {
    return axios.get("chatMessage");
  }

  static getChannelMessages(id : number) {
    let url = 'chatMessage/' + id.toString();
    return axios.get(url);
  }


  static createChatMessage(new_message: newMessageType) {
    return axios.post("chatMessage/newMessage", {
      channelID: new_message.channelID,
      senderID: new_message.senderID,
      messageContent: new_message.messageContent,
      messageTimestamp: new_message.messageTimestamp,
    });
  }
}
