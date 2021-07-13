import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { Channel } from "./channel.entity";
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
    @Body('Admins') Admins: User[],
    @Body('IsDirect') IsDirect:boolean,
    @Body('Password') Password:string){
    const channel = new Channel();
    channel.ChannelName = ChannelName;
    channel.IsPrivate = Private;
    channel.users = Users;
    channel.admins = Admins;
    channel.Password = Password;
    if (Users.length === 2)
      channel.IsDirect = true;
    else
      channel.IsDirect = false;

    const generatedID = await this.channelService.create(channel);
    return {id: generatedID}
  }

  @Get("findName")
  async findUserName(@Query() query): Promise<Channel> {
    return await this.channelService.findChannelName(query);
  }
}
