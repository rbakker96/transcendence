import { Comment } from "antd";
import { useState } from "react";
import UserProfilePopup from "../UserProfilePopup/UserProfilePopup";

type ChatMessageType = {
  channelID: number;
  senderID: number;
  messageContent: string;
  messageTimestamp: string;
};

type EachChatMessageProps = {
  message: ChatMessageType;
  IDIsMuted: number[];
  setIDIsMuted: Function;
  oneShownPopup: string;
  setOneShownPopup: Function;
  activeUserID: number;
  userName: string;
  avatar: string;
};

function EachChatMessage(props: EachChatMessageProps) {
  const content = props.message.messageContent;
  const datetime = props.message.messageTimestamp;
  const [OpenPopup, setOpenPopup] = useState(false);

  const togglePopup = () => {
    setOpenPopup(!OpenPopup);
    props.setOneShownPopup(props.message.messageTimestamp);
  };

  if (props.IDIsMuted.includes(props.message.senderID)) return <div />;
  else
    return (
      <div onClick={togglePopup}>
        <Comment
          content={content}
          author={props.userName}
          avatar={props.avatar}
          datetime={datetime}
        />
        {OpenPopup &&
          props.oneShownPopup === props.message.messageTimestamp && (
            <UserProfilePopup
              ActiveUserID={props.activeUserID}
              MessageUserID={props.message.senderID}
              UserName={props.userName}
              Avatar={props.avatar}
              ProfileLink={"http://placeholder"}
              handleClose={togglePopup}
              setIDIsMuted={props.setIDIsMuted}
            />
          )}
      </div>
    );
}

export default EachChatMessage;
