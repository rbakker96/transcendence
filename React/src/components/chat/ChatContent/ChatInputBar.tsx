import styles from "./ChatInputBar.module.css";
import { SyntheticEvent, useEffect, useState } from "react";
import API from "../../../API/API";

type TextBarType = {
  websocket: WebSocket;
  activeChannelID: number;
};

type newMessageType = {
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

function ChatInputBar(props: TextBarType) {
  const [senderID, setSenderID] = useState(0);
  const [message, setMessage] = useState("");
  const [messageTimestamp, setMessageTimeStamp] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    const setActiveUserID = async () => {
      const { data } = await API.User.getActiveUser();
      setSenderID(data.activeUserID);
    };
    setActiveUserID();
  }, []);

  async function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
    // setup new message
    setMessageTimeStamp(new Date().toLocaleString());
    const new_message: newMessageType = {
      channelID: props.activeChannelID,
      senderID: senderID,
      messageContent: message,
      messageTimestamp: messageTimestamp,
    };

    // send new message to database
    await API.ChatMessage.createChatMessage(new_message);

    // send new message to socket
    props.websocket.send(
      JSON.stringify({ event: "newMessage", data: new_message })
    );

    // reset input box to nothing
    setMessage("");
  }

  return (
    <div className={styles.textBar}>
      <input
        className={styles.textBarInput}
        value={message}
        type="text"
        placeholder={"Enter message..."}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className={styles.textBarSend}
        type={"submit"}
        onClick={submitHandler}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInputBar;
