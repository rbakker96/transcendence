import { Module } from "@nestjs/common";
import { ChatMessageController } from "./chatMessage.controller";
import { ChatMessageService } from "./chatMessage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatMessage } from "./chatMessage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  controllers: [ChatMessageController],
  providers: [ChatMessageService],
})
export class ChatMessageModule {}
