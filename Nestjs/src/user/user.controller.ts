import {Controller, Get, Request} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./models/user.entity";
import {JwtService} from "@nestjs/jwt";

@Controller('users')
export class UserController {

    constructor(private userService: UserService,
                private jwtService: JwtService,) {}

    @Get()
    async all(): Promise<User[]> {
        return this.userService.all();
    }

    @Get('/data/avatar')
    async getAvatar(@Request() req) {
        const client = await this.jwtService.verifyAsync(req.user);
        const clientID = client['id'];
        const clientData = await this.userService.findOne({clientID});

        return clientData.avatar;
    }

    @Get('/data/username')
    async getUsername(@Request() req) {
        const client = await this.jwtService.verifyAsync(req.user);
        const clientID = client['id'];
        const clientData = await this.userService.findOne({clientID});

        return clientData.username;
    }

    @Get('/data/username')
    async getClientData(@Request() req) {
        const client = await this.jwtService.verifyAsync(req.user);
        const clientID = client['id'];

        return  await this.userService.findOne({clientID});
    }

}
