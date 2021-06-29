import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./models/register.dto";
import { UserService } from "../user.service";
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    clientID(request: Request): Promise<number>;
    newUser(data: RegisterDto, clientID: number): Promise<void>;
}
