import ChannelAPI from './ChannelAPI'
import ChatMessageAPI from "./ChatMessageAPI";
import UserAPI from "./UserAPI";

export default class API {
    static Channels = ChannelAPI;
    static ChatMessage = ChatMessageAPI;
    static User = UserAPI;
}
