import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./user/auth/auth.module";
import { ChatMessageModule } from "./chat/message/chatMessage.module";
import {ChannelModule} from "./chat/channel/channel.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ChatMessageModule,
    ChannelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
