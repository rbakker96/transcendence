import {Body, Controller, Get, Patch, Post, Query} from "@nestjs/common";
import {ChannelService} from "./channel.service";
import {Channel} from "./channel.entity";
import {User} from "../../user/user.entity";
import * as bcrypt from 'bcryptjs'
import {IsDefined, IsOptional} from "class-validator";
import {ChannelUserType} from "./channelUsers.entity";

export class UpdateChannelUserDto {
  @IsDefined()
  userType: ChannelUserType

  @IsOptional()
  userId?: number

  @IsOptional()
  channelId?: string
}


@Controller('channels/')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Get()
  async all(@Query() query): Promise<Channel[]> {
    return this.channelService.getAll(query);
  }

  @Get('/one')
  async getOne(@Query() query): Promise<Channel> {
    console.log('channelId', query.channelID)
    return this.channelService.getOne(query.channelID);
  }

  @Get('/channel-users')
  async getChannelUsers(@Query('id') channelId: any) {
    return await this.channelService.getChannelUsers(channelId);
  }

  @Get('/test')
  async gettest(@Query('id') userId: any) {
    return await this.channelService.test(userId);
  }

  @Get('/is-admin')
  async getIsAdmin(@Query() query: any)
  {
    return await this.channelService.getIsAdmin(query.userId, query.channelId);
  }

  @Post()
  async addOneChannel(
    @Body('Name') ChannelName:string,
    @Body("IsPrivate") Private:boolean,
    @Body('IsDirect') IsDirect:boolean,
    @Body("Users") Users: User[],
    @Body('ownerId') ownerId : number,
    @Body('Password') Password:string){
    const channel = new Channel();
    channel.ChannelName = ChannelName;
    channel.IsPrivate = Private;
    channel.ownerId = ownerId;
    channel.IsDirect = IsDirect;
    channel.Password = await bcrypt.hash(Password, 12);
    const generatedID = await this.channelService.create(channel);
    if(!generatedID)
        return;
    else
    {
        Users.forEach((user : User) => {
          this.createChannelUser(generatedID.Id, user.id);
      })
    }

    return {id: generatedID.Id}
  }

  @Post('/channel-user')
  async createChannelUser(channelId: number, userId : number)
{

    const channelUser = await this.channelService.getUserLink(channelId, userId);
    if (!channelUser) {
      return await this.channelService.createChannelUser(channelId, userId);
    }
    return channelUser;
  }

  @Get("findName")
  async findUserName(@Query() query): Promise<Channel> {
    return await this.channelService.findChannelName(query) ;
  }


  @Post('remove')
  async removeUser(
      @Body('userId') userId: number,
      @Body('channelId') channelId: number)
  {
    await this.channelService.deleteChannelUser(userId, channelId);
  }


  @Post('login')
  async login(@Body('password') password: string,
              @Body('channelId') channelId: number,)
  {
    const channel : Channel = await this.channelService.login(channelId);
    return await bcrypt.compare(password, channel.Password);

  }

  @Patch('change-state')
  async patchState(
      @Body('newState') newState : number,
      @Body('channelId') channelId : number,
      @Body('userId') userId : number)
  {
    await this.channelService.updateChannelUser(newState, channelId, userId)
  }

  @Patch('change-password')
  async patchPassword(
      @Body('newPassword') newPassword : string,
      @Body('channelId') channelId : number)
  {
    console.log("new password controller =", newPassword);
    console.log("channelID controller = ", channelId);
    const hashed = await bcrypt.hash(newPassword, 12);

    await this.channelService.updatePassword(hashed, channelId)
  }
}
