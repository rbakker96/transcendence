import { Body, Controller, Headers, Post} from '@nestjs/common';
import {UserService} from "../user.service";

@Controller()
export class AuthController {

    constructor(private userService: UserService) {}

    @Post('register')
    async register(@Body() data) {
        return this.userService.create(data);
    }
}