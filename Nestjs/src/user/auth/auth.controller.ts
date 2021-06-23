import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {UserService} from "../user.service";
import {RegisterDto} from "./models/register.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @UseGuards(AuthGuard('intra'))
    @Get('auth/login')
    async login(@Request() req) {
        return 'succes';
        // return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('register')
    async register(@Body() data: RegisterDto) {
        return this.userService.create(data);
    }
}
