import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

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
    return this.userRepository.findOne({ pendingInvite: true });
  }

  async create(data): Promise<User> {
    return this.userRepository.save(data);
  }

  async update(id: number, data): Promise<any> {
    return this.userRepository.update(id, data);
  }

  async saveTwoFactorSecret(secret: string, clientID: number): Promise<any> {
    return this.userRepository.update(clientID, { twoFactorSecret: secret });
  }

  async enableTwoFactor(clientID: number): Promise<any> {
    return this.userRepository.update(clientID, { authentication: true });
  }

  async disableTwoFactor(clientID: number): Promise<any> {
    return this.userRepository.update(clientID, { authentication: false });
  }

  async sendGameInvite(clientID: number): Promise<any> {
    return this.userRepository.update(clientID, { pendingInvite: true });
  }

  async acceptGameInvite(clientID: number): Promise<any> {
    return this.userRepository.update(clientID, { pendingInvite: false });
  }

  async findUserName(data: any): Promise<User> {
    return await this.userRepository.findOne({ id: data.userID });
  }

  async channels(data: number): Promise<User> {
    return await this.userRepository.findOne(data, {
      relations: ["channels"],
    });
  }

  //for testing

  async findUserWithFriends(userID: number): Promise<User> {
   return await this.userRepository.findOne(userID,{ relations: ["friends"] });
  }

  async findAllUserFriends(): Promise<User[]> {
    return await this.userRepository.find({ relations: ["friends"] });
  }

  async saveFriendToUser(userID: number, friendID: number): Promise<User[]> {
    const friendToAdd = await this.userRepository.findOne({ id: friendID });
    const userToAdd = await this.userRepository.findOne({ id: userID });
    const AllUsers = await this.findAllUserFriends();

    if (userID !== friendID) {
      for (const user of AllUsers) {
        if (user.id === userToAdd.id) {
          const ifFriend = user.friends.filter(
            (friend) => friend.id === friendToAdd.id
          );
          if (!ifFriend.length || !user.friends.length)
            user.friends.push(friendToAdd);
        }
      }
      return this.userRepository.save(AllUsers);
    } else return [];
  }

  async deleteFriendFromUser(userID: number, friendID: number): Promise<User[]>{
    const friendToRemove = await this.userRepository.findOne({ id: friendID });
    const userToRemove = await this.userRepository.findOne({ id: userID });
    const AllUsers = await this.findAllUserFriends();

    if (userID !== friendID) {
      for (const user of AllUsers) {
        if (user.id === userToRemove.id) {
          user.friends = user.friends.filter(
            (friend: User) => friend.id !== friendToRemove.id
          );
        }
      }
      return this.userRepository.save(AllUsers);
    } else return [];
  }
}
