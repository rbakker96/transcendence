import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "./channel.entity";
import { Repository } from "typeorm";
import { User } from "../../user/user.entity";

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>
  ) {}

  async all(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  async create(channel: Channel): Promise<Channel> {
    return this.channelRepository.save(channel);
  }

  async findChannelName(data: any): Promise<Channel> {
    return await this.channelRepository.findOne({ Id: data.channelID });
  }
}
