import styles from "./ChatInputBar.module.css";
import React, {SyntheticEvent, useEffect, useState} from "react";
import API from "../../../API/API";
import axios from "axios";
import {Redirect} from "react-router-dom";

type TextBarType = {
  websocket: WebSocket;
  activeChannelID: number;
  activeUserID: number;
};

type newMessageType = {
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

function ChatInputBar(props: TextBarType) {
  const [unauthorized, setUnauthorized] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTimestamp, setMessageTimeStamp] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    let mounted = true;

    const authorization = async () => {
      try { await axios.get('userData'); }
      catch(err){
        if(mounted)
          setUnauthorized(true);
      }
    }
    authorization();
    return () => {mounted = false;}
  }, []);

  async function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
    // setup new message
    setMessageTimeStamp(new Date().toLocaleString());
    const new_message: newMessageType = {
      channelID: props.activeChannelID,
      senderID: props.activeUserID,
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

  if (unauthorized)
    return <Redirect to={'/'}/>;

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
