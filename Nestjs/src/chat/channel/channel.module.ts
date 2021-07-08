import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Channel} from "./channel.entity";
import {ChannelService} from './channel.service';
import {ChannelController} from "./channel.controller";
import {User} from "../../user/models/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Channel,
    User])],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})

export class ChannelModule{}
