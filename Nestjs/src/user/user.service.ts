import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./models/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: any): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }
}