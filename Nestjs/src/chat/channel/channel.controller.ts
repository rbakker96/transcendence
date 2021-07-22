import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { Channel } from "./channel.entity";
import { User } from "../../user/models/user.entity";
import * as bcrypt from "bcryptjs";

@Controller("channels/")
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Get()
  async all(): Promise<Channel[]> {
    return this.channelService.all();
  }

  @Get("one")
  async one(@Query() query: any): Promise<Channel> {
    return this.channelService.one(query);
  }

  @Post()
  async addOneChannel(
    @Body("Name") ChannelName: string,
    @Body("IsPrivate") Private: boolean,
    @Body("Users") Users: User[],
    @Body("Admins") Admins: User[],
    @Body("IsDirect") IsDirect: boolean,
    @Body("Password") Password: string
  ) {
    const channel = new Channel();
    channel.ChannelName = ChannelName;
    channel.IsPrivate = Private;
    channel.users = Users;
    channel.admins = Admins;
    channel.Password = await bcrypt.hash(Password, 12);
    channel.IsDirect = Users.length === 2;

    if (channel.IsDirect) {
      const allChannels = await this.channelService.all();
      const allDirectChannels = allChannels.filter(
        (channel) => channel.IsDirect
      );
      allDirectChannels.forEach((directChannel: Channel) => {
        if (
          JSON.stringify(directChannel.users) === JSON.stringify(channel.users)
        )
          throw new BadRequestException(
            "The same direct channel already exists."
          );
      });
    }

    const generatedChannel = await this.channelService.create(channel);
    return { id: generatedChannel.Id };
  }

  @Get("findName")
  async findUserName(@Query() query): Promise<Channel> {
    return await this.channelService.findChannelName(query);
  }

  @Post("remove")
  async removeUser(
    @Body("userId") userId: number,
    @Body("channelId") channelId: number
  ) {
    await this.channelService.removeUser(userId, channelId);
  }

  @Post("login")
  async login(
    @Body("password") password: string,
    @Body("channelId") channelId: number
  ) {
    const channel: Channel = await this.channelService.one(channelId);
    return await bcrypt.compare(password, channel.Password);
  }
}
