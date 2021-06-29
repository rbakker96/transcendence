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

}
