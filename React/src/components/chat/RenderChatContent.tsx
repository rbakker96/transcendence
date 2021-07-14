import ChatChannelHeader from "./ChatChannelHeader";
import ChatChannelMessages from "./ChatChannelMessages";

function RenderChatContent(props : any) {
    console.log("in render chat content :", props.activeChannelId)
    return (
        <div>
            <ChatChannelHeader activeChannelID={props.activeChannelId} />
            {props.activeChannelId
                ? <ChatChannelMessages activeChannelID={props.activeChannelId} />
                : <div />
            }
        </div>
    )
}

export default RenderChatContent