import {Body, Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
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

  @Get(':id')
  async getChannelMessages(@Param('id') id: string) : Promise<ChatMessage[]> {
    const useid : number = +id;
    return await this.chatMessageService.findChannelChatsMessages(useid)
  }
  @Post("newMessage")
  async createChatMessage(@Body() message: ChatMessageDto) {
    return await this.chatMessageService.createChatMessage(message);
  }
}
