import {HttpService, Injectable} from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from "@nestjs/jwt";
import { stringify } from "querystring";


//APPLICATION DATA
const uid = 'f1ef4d09a69740a304c69a96158863d032ce914630ed4dcaa0eb33e6da4ae71f';
const secret = 'f527950c758cff0e38df0b5f734c2636a3fc118ed93354c22f44521fa4ec2373';
const callbackURL = 'http://localhost:8080/register'


@Injectable()
export class AuthService {
    constructor(
        private http: HttpService,
        private usersService: UserService,
        private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.username === username) {
            return username;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user };
        return {
            access_token: this.jwtService.sign(payload), username: user
        };
    }

}