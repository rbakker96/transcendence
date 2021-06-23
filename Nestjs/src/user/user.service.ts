import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    private readonly users = [
        {
            id: 1,
            username: 'john',
            email: 'test@test.com',
            phonenumber: '0611111111',
            authentication: false,
        },
        {
            id: 2,
            username: 'piet',
            email: 'test2@test.com',
            phonenumber: '0622222222',
            authentication: true,
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }


    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }
}