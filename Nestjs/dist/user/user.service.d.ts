import { User } from "./models/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepository;
    private readonly users;
    findOne(username: string): Promise<User | undefined>;
    constructor(userRepository: Repository<User>);
    all(): Promise<User[]>;
    create(data: any): Promise<User>;
}
