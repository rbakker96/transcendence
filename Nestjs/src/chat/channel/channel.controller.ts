import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { Channel } from "./channel.entity";
import { User } from "../../user/user.entity";

@Controller("channels")
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Get()
  async all(): Promise<Channel[]> {
    return this.channelService.all();
  }

  @Post()
  async addOneChannel(
    @Body("Name") ChannelName: string,
    @Body("Admin") ChannelAdmin: string,
    @Body("Users") ChannelUsers: string,
    @Body("IsPrivate") Private: boolean
  ) {
    const channel = new Channel();
    channel.ChannelName = ChannelName;
    channel.Admin = ChannelAdmin;
    channel.Users = ChannelUsers;
    channel.IsPrivate = Private;

    const generatedID = await this.channelService.create(channel);
    return { id: generatedID };
  }

  @Get("findName")
  async findUserName(@Query() query): Promise<Channel> {
    return await this.channelService.findChannelName(query);
  }
}
