import {Body, Controller, Get, Post, Put, Redirect, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from "../user.service";
import { RegisterDto } from "./models/register.dto";
import { UpdateDto } from "./models/update.dto";
import { AuthGuard } from "@nestjs/passport";
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { verifyUser } from "./strategy/auth.guard";

@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
    ) {}

    @UseGuards(AuthGuard('intra'))
    @Get('auth/login')
    async login(@Req() req, @Res({passthrough: true}) response: Response) {
        await response.cookie('clientID', req.user, {httpOnly: true});
        const client = await this.jwtService.verifyAsync(req.user);

        const clientData = await this.userService.findOne(client['id']);
        console.log('clientData', clientData);

        if(!clientData)
            return response.redirect('http://localhost:8080/register')
        if (clientData.authentication == true)
            return response.redirect('http://localhost:8080/twoFactor')
        else
            return response.redirect('http://localhost:8080/profile')
    }

    @UseGuards(verifyUser)
    @Post('register')
    async register(@Body() data: RegisterDto, @Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        await this.authService.newUser(data, clientID);
    }

    @UseGuards(verifyUser)
    @Put('update')
    async update(@Body() data: UpdateDto, @Req() request: Request) {
        await this.authService.updateUser(data);
    }

    @UseGuards(verifyUser)
    @Get('userData')
    async getUserData(@Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        return await this.userService.findOne(clientID);
    }

    @UseGuards(verifyUser)
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('clientID');

        return {
            message: 'Success'
        }
    }

}
