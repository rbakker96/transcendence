import { Module } from "@nestjs/common";
import { ChatMessageController } from "./chatMessage.controller";
import { ChatMessageService } from "./chatMessage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatMessage } from "./chatMessage.entity";
import {AuthService} from "../../user/auth/auth.service";
import {UserModule} from "../../user/user.module";
import {AuthModule} from "../../user/auth/auth.module";
import {Game} from "../../game/game.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../../user/auth/models/constants";

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]),
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([Game]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [ChatMessageController],
  providers: [ChatMessageService, AuthService],
})
export class ChatMessageModule {}
