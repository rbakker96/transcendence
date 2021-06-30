import { Module } from '@nestjs/common';
import { ChatMessageController } from './chatMessage.controller';
import { ChatMessageService } from './chatMessage.service';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService]
})
export class ChatMessageModule {}
