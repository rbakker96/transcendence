import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Channel} from "./channel.entity";
import {ChannelService} from './channel.service';
import {ChannelController} from "./channel.controller";
import {ChannelUsers} from "../channelUsers/channelUsers.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Channel, ChannelUsers])],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})

export class ChannelModule{}
