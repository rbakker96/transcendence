import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatMessage } from "./chatMessage.entity";
import { Repository } from "typeorm";
import { ChatMessageDto } from "./dto/chatMessage.dto";

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>
  ) {}

  async findAllChatMessages(): Promise<ChatMessage[]> {
    return await this.chatMessageRepository.find();
  }

  async createChatMessage(data: ChatMessageDto): Promise<ChatMessage> {
    return await this.chatMessageRepository.save(data);
  }
}
