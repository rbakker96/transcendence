import {Body, Controller, Get, Post} from '@nestjs/common';
import {ChannelService} from "./channel.service";
import {Channel} from "./channel.entity";


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
    @Body("Admin") ChannelAdmin:string,
    @Body("Users") ChannelUsers:string,
    @Body("IsPrivate") Private:boolean){
    const channel = new Channel();
    channel.ChannelName = ChannelName;
    channel.Admin = ChannelAdmin;
    channel.Users = ChannelUsers;
    channel.IsPrivate = Private;

    const generatedID = await this.channelService.create(channel);
    return {id: generatedID}
  }


}
