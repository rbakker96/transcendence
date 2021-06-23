import { UserService } from "../user.service";
import { RegisterDto } from "./models/register.dto";
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(req: any): Promise<string>;
    getProfile(req: any): any;
    register(data: RegisterDto): Promise<import("../models/user.entity").User>;
}
