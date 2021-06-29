import { UserService } from "./user.service";
import { User } from "./models/user.entity";
import { JwtService } from "@nestjs/jwt";
export declare class UserController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    all(): Promise<User[]>;
}
