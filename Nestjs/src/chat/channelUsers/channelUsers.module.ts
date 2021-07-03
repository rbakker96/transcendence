import {TypeOrmModule} from "@nestjs/typeorm";
import {ChannelUsersController} from "./channelUsers.controller";
import {ChannelUsersService} from "./channelUsers.service";
import {Module} from "@nestjs/common";
import {ChannelUsers} from "./channelUsers.entity";

@Module( {
    imports: [TypeOrmModule.forFeature([ChannelUsers])],
    controllers: [ChannelUsersController],
    providers: [ChannelUsersService],
    exports: [ChannelUsersService],
})

export class ChannelUsersModule{}