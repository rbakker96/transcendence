import { Body, Injectable } from '@nestjs/common';
import { authenticator } from "otplib";
import { Request, Response } from 'express';
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./models/register.dto";
import { UserService} from "../user.service";
import { UpdateDto } from "./models/update.dto";
import QRCode from 'qrcode'
import { toString } from 'qrcode';
// import { toDataURL } from 'qrcode';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async twoFactorAuthSecret(clientID: number) {
        const client = await this.userService.findOne(clientID);
        console.log(client);
        const secret = authenticator.generateSecret();
        console.log(secret);
        await this.userService.saveTwoFactorSecret(secret, clientID);


        const updated_client = await this.userService.findOne(clientID);
        console.log(updated_client);


        return  authenticator.keyuri(client.email, 'ft_transcendence', secret); //OtpAuthUrl
    }

    async createQRcode(stream: Response, otpauthUrl: string) {
        var QRCode = require('qrcode');

        console.log("here");
        await QRCode.toFile('./qrcode.png', otpauthUrl);
        console.log('not here');
        return 'success';
        // stream.setHeader("content-type","image/png");
        // return toFileStream(stream, otpauthUrl);
        // console.log(await QRCode.toDataURL(otpauthUrl))
        // console.log( await QRCode.toDataURL(otpauthUrl));
    }

    async twoFactorAuthVerify(code: string, clientID: number) {
        const client = await this.userService.findOne(clientID);

        return authenticator.verify({token: code, secret: client.twoFactorSecret});
    }

    async clientID(request: Request): Promise<number> {
        const cookie = request.cookies['clientID'];

        console.log('cookie: ', cookie);

        const data = await this.jwtService.verifyAsync(cookie);

        return data['id'];
    }

    async newUser(@Body() data: RegisterDto, clientID: number) {
        data.avatar = 'http://localhost:8000/api/uploads/egg.jpeg';
        data.id = clientID;
        data.authentication = false;

        console.log(data);

        await this.userService.create(data);
    }

    async updateUser(@Body() data: UpdateDto) {
        console.log(data);

        await this.userService.update(data.id, data);
    }

}
