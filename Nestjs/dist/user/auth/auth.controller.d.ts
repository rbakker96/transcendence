import { UserService } from "../user.service";
import { RegisterDto } from "./models/register.dto";
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private userService;
    private jwtService;
    private authService;
    constructor(userService: UserService, jwtService: JwtService, authService: AuthService);
    login(req: any, response: Response): Promise<void>;
    getProfile(req: any): any;
    register(data: RegisterDto, request: Request): Promise<void>;
}
