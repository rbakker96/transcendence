import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "./channel.entity";
import {getRepository, Repository} from "typeorm";
import {User} from "../../user/models/user.entity";

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>
  ) {}

  async one(id : number) : Promise<Channel> {
    console.log("in find one function", id);
    return this.channelRepository.findOne(id)
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
}
