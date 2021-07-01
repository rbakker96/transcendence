import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
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

    async update(id: number, data): Promise<any> {
        return this.userRepository.update(id, data);
    }

    async findUserName(data: any): Promise<User> {
        console.log(data.userID);
        return await this.userRepository.findOne({ id: data.userID });
    }
}