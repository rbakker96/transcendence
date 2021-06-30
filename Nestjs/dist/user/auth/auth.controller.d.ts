import { UserService } from "../user.service";
import { RegisterDto } from "./models/register.dto";
import { UpdateDto } from "./models/update.dto";
import { Response, Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private userService;
    private jwtService;
    private authService;
    constructor(userService: UserService, jwtService: JwtService, authService: AuthService);
    login(req: any, response: Response): Promise<void>;
    register(data: RegisterDto, request: Request): Promise<void>;
    update(data: UpdateDto, request: Request): Promise<void>;
    getUserData(request: Request): Promise<import("../models/user.entity").User>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
