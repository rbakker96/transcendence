import {Body, Injectable} from '@nestjs/common';
import {authenticator} from "otplib";
import {Request} from 'express';
import {JwtService} from "@nestjs/jwt";
import {RegisterDto} from "./models/register.dto";
import {UserService} from "../user.service";
import {UpdateDto} from "./models/update.dto";
import {User} from "../models/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async twoFactorAuthSecret(clientID: number) {
        const client = await this.userService.findOne(clientID);
        const secret = authenticator.generateSecret();
        await this.userService.saveTwoFactorSecret(secret, clientID);

        return  authenticator.keyuri(client.email, 'ft_transcendence', secret); //OtpAuthUrl
    }

    async createQRcode(otpauthUrl: string) {
        var QRCode = require('qrcode');
        await QRCode.toFile('./uploads/qrcode.png', otpauthUrl);

        return {url: 'http://localhost:8000/api/uploads/qrcode.png'};
    }

    async twoFactorAuthVerify(code: string, clientID: number) {
        const client = await this.userService.findOne(clientID);

        return authenticator.verify({token: code, secret: client.twoFactorSecret});
    }

    async clientID(request: Request): Promise<number> {
        const cookie = request.cookies['clientID'];
        const data = await this.jwtService.verifyAsync(cookie);

        return data['id'];
    }

    async client(request: Request): Promise<User> {
        const cookie = request.cookies['clientID'];
        return await this.jwtService.verifyAsync(cookie);
    }

    async newUser(@Body() data: RegisterDto, clientID: number) {
        data.avatar = 'http://localhost:8000/api/uploads/egg.jpeg';
        data.id = clientID;
        data.authentication = false;

        await this.userService.create(data);
    }

    async updateUser(@Body() data: UpdateDto) {
        await this.userService.update(data.id, data);
    }

}
