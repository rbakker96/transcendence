import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "./channel.entity";
import {getConnection, getRepository, Repository} from "typeorm";


@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>
  ) {}

  async one(id : number) : Promise<Channel> {
    const channelUsers =  await getRepository(Channel)
        .createQueryBuilder("channel")
        .leftJoinAndSelect("channel.users", "user")
        .where("channel.Id = : id", {id : id})
        .getOne();
    return channelUsers;
  }

  async all() : Promise<Channel[]> {
    const channelUsers = await getRepository(Channel)
        .createQueryBuilder("channel")
        .leftJoinAndSelect("channel.users", "user")
        .getMany();
    return channelUsers;
  }
  async create(channel: Channel): Promise<Channel> {
    return this.channelRepository.save(channel);
  }

  async findChannelName(data: any): Promise<Channel> {
    return await this.channelRepository.findOne({ Id: data.channelID });
  }

  async removeUser(userId : number, channelId : number) {
    console.log("userID = ", userId);
    console.log("channelID = ", channelId);
    await getConnection()
        .createQueryBuilder()
        .relation(Channel, "users")
        .of(channelId)
        .remove(userId)
  }

}
