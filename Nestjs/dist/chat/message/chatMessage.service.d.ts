import { ChatMessage } from "./chatMessage.entity";
import { Repository } from "typeorm";
import { ChatMessageDto } from "./dto/chatMessage.dto";
export declare class ChatMessageService {
    private readonly chatMessageRepository;
    constructor(chatMessageRepository: Repository<ChatMessage>);
    findAllChatMessages(): Promise<ChatMessage[]>;
    createChatMessage(data: ChatMessageDto): Promise<ChatMessage>;
}
