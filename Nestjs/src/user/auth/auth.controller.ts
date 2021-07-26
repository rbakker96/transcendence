import {Body, Controller, Get, Post, Put, Req, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
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

        if(!clientData)
            return response.redirect('http://localhost:8080/register')
        if (clientData.authentication == true)
            return response.redirect('http://localhost:8080/twoFactor')
        else
            return response.redirect('http://localhost:8080/profile')
    }

    @UseGuards(verifyUser)
    @Get('2fa/generate')
    async activate2fa(@Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        const OtpAuthUrl = await this.authService.twoFactorAuthSecret(clientID);

        return this.authService.createQRcode(OtpAuthUrl);
    }

    @UseGuards(verifyUser)
    @Post('2fa/verify')
    async verify2fa (@Req() request: Request, @Body() data) {
        const clientID = await this.authService.clientID(request);
        const validated = await this.authService.twoFactorAuthVerify(data.code, clientID);

        if (!validated)
            throw new UnauthorizedException('Wrong authentication code');
        else
            await this.userService.enableTwoFactor(clientID);

        return true;
    }

    @UseGuards(verifyUser)
    @Post('2fa/login')
    async login2fa (@Req() request: Request, @Body() data) {
        const clientID = await this.authService.clientID(request);
        const validated = await this.authService.twoFactorAuthVerify(data.code, clientID);

        if (!validated)
            throw new UnauthorizedException('Wrong authentication code');
    }

    @UseGuards(verifyUser)
    @Post('2fa/disable')
    async disable2fa (@Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        await this.userService.disableTwoFactor(clientID);

        return true;
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
    @Put('sendGameInvite')
    async sendGameInvite(@Req() request: Request, @Body() data): Promise<any> {
        if (await this.userService.findPrivateGame())
            throw new UnauthorizedException('Only one private game possible');
        else
            return await this.userService.sendGameInvite(data);
    }

    @UseGuards(verifyUser)
    @Put('acceptGameInvite')
    async acceptGameInvite(@Req() request: Request, @Body() data): Promise<any> {
        return await this.userService.acceptGameInvite(data);
    }

    @UseGuards(verifyUser)
    @Get('userData')
    async getUserData(@Req() request: Request) {
        const clientID = await this.authService.clientID(request);
        return await this.userService.findOne(clientID);
    }

    @UseGuards(verifyUser)
    @Post('publicUserData')
    async getPublicUserData(@Req() request: Request, @Body() data) {
        return await this.userService.findOne(data.id);
    }

    @UseGuards(verifyUser)
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('clientID');

        return {message: 'Success'}
    }

}
