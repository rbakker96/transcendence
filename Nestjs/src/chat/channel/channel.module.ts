import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Channel} from "./channel.entity";
import {ChannelService} from './channel.service';
import {ChannelController} from "./channel.controller";
import {User} from "../../user/user.entity";
import {ChannelUser} from "./channelUsers.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../../user/auth/models/constants";
import {UserModule} from "../../user/user.module";
import {AuthModule} from "../../user/auth/auth.module";
import {AuthService} from "../../user/auth/auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([Channel,
    User, ChannelUser]),
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [ChannelController],
  providers: [ChannelService, AuthService],
  exports: [ChannelService],
})

export class ChannelModule{}
