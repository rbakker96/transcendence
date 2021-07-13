import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";

import {useEffect, useState} from "react";
import API from "../../API/API";
import RenderGivePassword from "./RenderGivePassword";

type ChatContentProps = {
  activeChannelID: number;
};

function ChatContent(props: ChatContentProps) {
  const active_channel_ID = props.activeChannelID;
  const [isPrivate, setIsPrivate] = useState(true);
  const [PasswordValid, setPasswordValid] = useState(false);

  // API call to check if channel is private

  useEffect( () => {
    const getChannelType = async () => {
      const {data}  = await API.Channels.findName(active_channel_ID)
      setIsPrivate(data.IsPrivate);
    }
    getChannelType();
  })

  console.log("Is private = ", isPrivate)
  if (isPrivate && !PasswordValid)
  {
    return <div>
      // if channel is private render password screen
      <RenderGivePassword activeChannelID={active_channel_ID} setPasswordValid={setPasswordValid}  />
    </div>
  }
  else
  {
    return (
        <div>
          <ChatChannelHeader activeChannelID={active_channel_ID} />
          {active_channel_ID
              ? <ChatChannelMessages activeChannelID={active_channel_ID} />
              : <div />
          }
        </div>
    );
  }
}

export default ChatContent;
