import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { ChatMessageService } from "./chatMessage.service";
import { ChatMessage } from "./chatMessage.entity";
import { ChatMessageDto } from "./dto/chatMessage.dto";

@Controller("chatMessage")
export class ChatMessageController {
  constructor(private chatMessageService: ChatMessageService) {}

  @Get()
  async getAllChatMessages(): Promise<ChatMessage[]> {
    return await this.chatMessageService.findAllChatMessages();
  }

  @Post("newMessage")
  async createChatMessage(@Body() message: ChatMessageDto) {
    return await this.chatMessageService.createChatMessage(message);
  }
}
