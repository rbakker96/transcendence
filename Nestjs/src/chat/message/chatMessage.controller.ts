import {Body, Controller, Get, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import { ChatMessageService } from "./chatMessage.service";
import { ChatMessage } from "./chatMessage.entity";
import { ChatMessageDto } from "./dto/chatMessage.dto";
import { verifyUser } from "../../user/auth/strategy/auth.guard";

@Controller("chatMessage")
export class ChatMessageController {
  constructor(private chatMessageService: ChatMessageService) {}

  @UseGuards(verifyUser)
  @Get()
  async getAllChatMessages(): Promise<ChatMessage[]> {
    return await this.chatMessageService.findAllChatMessages();
  }

  @UseGuards(verifyUser)
  @Get(':id')
  async getChannelMessages(@Param('id') id: string) : Promise<ChatMessage[]> {
    const useid : number = +id;
    return await this.chatMessageService.findChannelChatsMessages(useid)
  }

  @UseGuards(verifyUser)
  @Post("newMessage")
  async createChatMessage(@Body() message: ChatMessageDto) {
    return await this.chatMessageService.createChatMessage(message);
  }
}
