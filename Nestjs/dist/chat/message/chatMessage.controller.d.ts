import { ChatMessageService } from "./chatMessage.service";
import { ChatMessage } from "./chatMessage.entity";
import { ChatMessageDto } from "./dto/chatMessage.dto";
export declare class ChatMessageController {
    private chatMessageService;
    constructor(chatMessageService: ChatMessageService);
    getAllChatMessages(): Promise<ChatMessage[]>;
    createChatMessage(message: ChatMessageDto): Promise<ChatMessage>;
}
