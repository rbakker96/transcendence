import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}














// import { PassportStrategy } from '@nestjs/passport';
// import {HttpService, Injectable,} from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { Strategy } from 'passport-oauth2';
// import { stringify } from 'querystring';
//
//
// //APPLICATION DATA
// const uid = 'f1ef4d09a69740a304c69a96158863d032ce914630ed4dcaa0eb33e6da4ae71f';
// const secret = 'f527950c758cff0e38df0b5f734c2636a3fc118ed93354c22f44521fa4ec2373';
// const callbackURL = 'http://localhost:8080/register'
// const state = 'xqm5wXX'
//
// @Injectable()
// export class OAuthStrategy extends PassportStrategy(Strategy, '42OAuth') {
//     constructor() {
//         super({
//             authorizationURL: `https://discordapp.com/api/oauth2/authorize?${ stringify({
//                 client_id     : uid,
//                 redirect_uri  : callbackURL,
//                 scope         : 'public',
//                 response_type : 'code',
//             }) }`,
//             tokenURL        : 'https://api.intra.42.fr/oauth/token',
//             clientID        : uid,
//             clientSecret    : secret,
//             callbackURL     : callbackURL,
//             scope           : 'public',
//         });
//     }
// }
