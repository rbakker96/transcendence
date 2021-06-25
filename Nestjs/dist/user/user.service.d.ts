import { User } from "./models/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    all(): Promise<User[]>;
    findOne(id: any): Promise<User>;
    create(data: any): Promise<User>;
}
