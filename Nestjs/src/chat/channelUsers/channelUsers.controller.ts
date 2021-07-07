import {Body, Controller, Get, Post} from "@nestjs/common";
import {ChannelUsersService} from "./channelUsers.service";
import {ChannelUsers} from './channelUsers.entity';
import {Channel} from "../channel/channel.entity";
import {User} from "../../user/models/user.entity";

@Controller('channelUsers')
export class ChannelUsersController {
    constructor(private channelUserService: ChannelUsersService) {}

    @Get()
    async all() : Promise<ChannelUsers[]> {
        return this.channelUserService.all();
    }


    @Post() // the channel id should be retrieved from the url
    async addOneUser(
        @Body('ChannelId') ChannelId:Channel,
        @Body('UserId') UserId:User) {


        const channelUser = new ChannelUsers();
        channelUser.channel = ChannelId;
        channelUser.user = UserId;
        console.log(" Dit is volgens mij die print" ,channelUser.user);
        const generatedID = await this.channelUserService.create(channelUser);
        return {id: generatedID}
    }
}