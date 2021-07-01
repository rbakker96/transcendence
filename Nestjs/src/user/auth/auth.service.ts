import {Body, Injectable} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./models/register.dto";
import { UserService} from "../user.service";
import { UpdateDto } from "./models/update.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

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
