import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {getRepository, Repository} from "typeorm";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: any): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findPrivateGame(): Promise<User> {
    return this.userRepository.findOne({pendingInvite: true});
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }

  async update(id: number, data): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async saveTwoFactorSecret(secret: string, clientID: number): Promise<any> {
    return this.userRepository.update(clientID, {twoFactorSecret: secret});
  }

  async enableTwoFactor(clientID: number): Promise<any> {
    return this.userRepository.update(clientID, {authentication: true});
  }

  async disableTwoFactor(clientID: number): Promise<any> {
    return this.userRepository.update(clientID, {authentication: false});
  }

  async sendGameInvite(clientID: number): Promise<any> {
    return this.userRepository.update(clientID, {pendingInvite: true});
  }

  async acceptGameInvite(clientID: number): Promise<any> {
    return this.userRepository.update(clientID, {pendingInvite: false});
  }

  async findUserName(data: any): Promise<User> {
    return await this.userRepository.findOne({ id: data.userID });
  }

  async channels(data : number) : Promise<User>{
    return await this.userRepository.findOne(data, {
      relations: ['channels']
    })
  }

}
