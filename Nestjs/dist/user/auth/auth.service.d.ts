import { HttpService } from '@nestjs/common';
import { UserService } from '../user.service';
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private http;
    private usersService;
    private jwtService;
    constructor(http: HttpService, usersService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        username: any;
    }>;
}
