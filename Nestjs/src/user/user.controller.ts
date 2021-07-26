import {Body, Controller, Get, Param, Post, Query, Req, UseGuards} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthService } from "./auth/auth.service";
import { Request } from "express";
import { verifyUser } from "./auth/strategy/auth.guard";
import { Channel } from "../chat/channel/channel.entity";

@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get()
  async all(): Promise<User[]> {
    return this.userService.all();
  }

  @Get("findName")
  async findUserName(@Query() query): Promise<User> {
    return await this.userService.findUserName(query);
  }

  @UseGuards(verifyUser)
  @Get("getActiveUserID")
  async getActiveUserID(@Req() request: Request) {
    const id = await this.authService.clientID(request);
    return { activeUserID: id };
  }

  @Get("channels")
  async getChannels(@Query() query): Promise<Channel[]> {
    let res: Channel[] = [];
    if (query.id === 0) return res;
    else if (query.id > 0) {
      const data: any = await this.userService.channels(query);
      res = data.channels;
      return res;
    }
  }

  @Get("allUserFriends")
  async getAllUserFriends(): Promise<User[]> {
    return await this.userService.findAllUserFriends();
  }

  @Post("saveFriendToUser")
  async saveFriendToUser(@Body() message): Promise<User[]> {
    return await this.userService.saveFriendToUser(message.userID, message.friendID);
  }

  @Post("deleteTestUser/:userID&:friendID")
  async deleteFriendToUser(@Param('userID') userID: number, @Param('friendID') friendID: number ): Promise<User[]> {
    return await this.userService.deleteFriendFromUser(userID, friendID);
  }
}
