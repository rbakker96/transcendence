import { Comment } from "antd";
import { useEffect, useState } from "react";
import API from "../../../API/API";
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
};

function EachChatMessage(props: EachChatMessageProps) {
  const content = props.message.messageContent;
  const datetime = props.message.messageTimestamp;
  const [UserName, setUserName] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [OpenPopup, setOpenPopup] = useState(false);
  const [ActiveUser, setActiveUser] = useState(0);

  const togglePopup = () => {
    setOpenPopup(!OpenPopup);
    props.setOneShownPopup(props.message.messageTimestamp);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await API.User.findName(props.message.senderID);
      setUserName(data.username);
      setAvatar(data.avatar);
    };
    getUser();
  }, [props, setUserName, setAvatar]);

  useEffect(() => {
    const setActiveUserID = async () => {
      const { data } = await API.User.getActiveUser();
      setActiveUser(data.activeUserID);
    };
    setActiveUserID();
  }, []);

  if (props.IDIsMuted.includes(props.message.senderID)) return <div />;
  else
    return (
      <div onClick={togglePopup}>
        <Comment
          content={content}
          author={UserName}
          avatar={Avatar}
          datetime={datetime}
        />
        {OpenPopup &&
          props.oneShownPopup === props.message.messageTimestamp && (
            <UserProfilePopup
              ActiveUserID={ActiveUser}
              MessageUserID={props.message.senderID}
              UserName={UserName}
              Avatar={Avatar}
              ProfileLink={"http://placeholder"}
              handleClose={togglePopup}
              setIDIsMuted={props.setIDIsMuted}
            />
          )}
      </div>
    );
}

export default EachChatMessage;
