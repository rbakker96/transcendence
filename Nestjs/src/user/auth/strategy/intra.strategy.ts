import { PassportStrategy } from '@nestjs/passport';
import {HttpService, Injectable, Res} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-oauth2';
import { stringify } from 'querystring';
import { JwtService } from "@nestjs/jwt";

//APPLICATION DATA
const uid = 'f1ef4d09a69740a304c69a96158863d032ce914630ed4dcaa0eb33e6da4ae71f';
const secret = 'f527950c758cff0e38df0b5f734c2636a3fc118ed93354c22f44521fa4ec2373';
const callbackURL = 'http://localhost:8000/api/auth/login'
const state = 'xqm5wXX'


@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, 'intra') {
    constructor(
        private authService: AuthService,
        private http: HttpService,
        private jwtService: JwtService
    ) {
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?${ stringify({
                client_id     : uid,
                redirect_uri  : callbackURL,
                scope         : 'public',
                state         : state,
                response_type : 'code',
            }) }`,
            tokenURL        : 'https://api.intra.42.fr/oauth/token',
            clientID        : uid,
            clientSecret    : secret,
            callbackURL     : callbackURL,
            scope           : 'public',
        });
    }

    async validate(accessToken: string): Promise<any> {
        const data = await this.http.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${ accessToken }` },
        }).toPromise();

        console.log(data.data.id);

        const jwt = await this.jwtService.signAsync({id: data.data.id});
        console.log(jwt);

        return jwt;
    }

}
