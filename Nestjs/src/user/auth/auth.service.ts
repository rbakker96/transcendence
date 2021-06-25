import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) {}

    async clientID(request: Request): Promise<number> {
        const cookie = request.cookies['clientID'];

        console.log('cookie: ', cookie);

        const data = await this.jwtService.verifyAsync(cookie);

        return data['id'];
    }
}
