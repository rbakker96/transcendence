import {Body, Controller, Get, Post, Redirect, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from "../user.service";
import { RegisterDto } from "./models/register.dto";
import { AuthGuard } from "@nestjs/passport";
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

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
        const clientID = client['id'];

        console.log('client fd: ', clientID);

        const clientData = await this.userService.findOne(clientID);

        console.log('client data', clientData);

        if(!clientData)
            return response.redirect('http://localhost:8080/register')
        if (clientData.authentication == true)
            return response.redirect('http://localhost:8080/twoFactor')
        else
            return response.redirect('http://localhost:8080/profile')
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @Post('register')
    async register(@Body() data: RegisterDto, @Req() request: Request, @Res({passthrough: true}) response: Response) {

        const clientID = await this.authService.clientID(request);
        console.log(clientID);


        data.avatar = './img/egg.jpeg';
        data.id = clientID;
        data.authentication = false;

        console.log(data);

        await this.userService.create(data);

        return response.redirect('http://localhost:8080/profile');
    }

}
