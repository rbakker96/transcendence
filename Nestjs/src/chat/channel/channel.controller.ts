import {Body, Controller, Get, Post} from '@nestjs/common';
import {ChannelService} from "./channel.service";
import {Channel} from "./channel.entity";
import {User} from "../../user/models/user.entity";


@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Get()
  async all(): Promise<Channel[]> {
    return this.channelService.all();
  }

  @Post()
  async addOneChannel(
    @Body('Name') ChannelName:string,
    @Body("IsPrivate") Private:boolean,
    @Body('Users') Users: User[],
    @Body('Admins') Admins: User[]){
    const channel = new Channel();
    channel.ChannelName = ChannelName;
    channel.IsPrivate = Private;
    channel.users = Users;
    channel.admins = Admins;

    const generatedID = await this.channelService.create(channel);
    return {id: generatedID}
  }


}
