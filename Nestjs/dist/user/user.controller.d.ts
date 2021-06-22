import { UserService } from "./user.service";
import { User } from "./models/user.entity";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    all(): Promise<User[]>;
}
