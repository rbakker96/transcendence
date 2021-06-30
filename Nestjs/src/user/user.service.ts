import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./models/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async all(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(data): Promise<User> {
    return await this.userRepository.save(data);
  }

  async findUserName(data: any): Promise<User> {
    console.log(data.userID);
    return await this.userRepository.findOne({ id: data.userID });
  }
}
