import { UserService } from "../user.service";
export declare class AuthController {
    private userService;
    constructor(userService: UserService);
    register(data: any): Promise<import("../models/user.entity").User>;
}
