import ChatChannelHeader from "./ChatContent/ChatChannelHeader";
import ChatChannelMessages from "./ChatContent/ChatChannelMessages";
function RenderChatContent(props : any) {
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