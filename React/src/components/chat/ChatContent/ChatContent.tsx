import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";

import {useEffect, useState} from "react";
import API from "../../../API/API";
import RenderGivePassword from "../RenderGivePassword";
import {Redirect} from "react-router-dom";
import RenderChatContent from "../RenderChatContent";

type ChatContentProps = {
  activeChannelID: number;
  setActiveChannelID : Function;
};

function ChatContent(props: ChatContentProps) {
  const active_channel_ID : number = props.activeChannelID;
  const [isPrivate, setIsPrivate] = useState(false);
  const [PasswordValid, setPasswordValid] = useState(false);

  // API call to check if channel is private

  useEffect( () => {
    const getChannelType = async () => {
      const {data}  = await API.Channels.findName(active_channel_ID)
      setIsPrivate(data.IsPrivate);
    }
    getChannelType();
  })

  if (isPrivate && !PasswordValid)
  {
    return (
    <div>
      <RenderGivePassword activeChannelID={active_channel_ID} setPasswordValid={setPasswordValid} passwordValid={PasswordValid} />
    </div>)
  }
  else
  {
    return (
        <div>
          <RenderChatContent activeChannelId={active_channel_ID}/>
        </div>
    );
  }


}

export default ChatContent;
