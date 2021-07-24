import {BadRequestException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "./channel.entity";
import {getConnection, getRepository, Repository} from "typeorm";
import {ChannelUser, ChannelUserType} from "./channelUsers.entity";
import {User} from "../../user/models/user.entity";


@Injectable()
export class ChannelService {
  constructor(
      @InjectRepository(ChannelUser)
      private channelUserRepository: Repository<ChannelUser>,
      @InjectRepository(Channel)
      private channelRepository: Repository<Channel>,
      @InjectRepository(User)
      private usersRepository: Repository<User>,
  ) {}

  async one(data : any) : Promise<Channel> {
    const id = +data.Id;
    const channelUsers =  await getRepository(Channel)
        .createQueryBuilder("channel")
        .leftJoinAndSelect("channel.users", "user")
        .where("channel.Id = :Id", { Id : id})
        .getOne();
    return channelUsers;
  }

  async login(id : number) : Promise<Channel> {
    const channelUsers =  await getRepository(Channel)
        .createQueryBuilder("channel")
        .leftJoinAndSelect("channel.users", "user")
        .where("channel.Id = :Id", { Id : id})
        .getOne();
    return channelUsers;
  }

  public getAll = async (userId: number): Promise<Channel[]> => {
    return await this.channelRepository
        .createQueryBuilder('channel')
        .leftJoinAndMapOne('channel.userLinks',
            ChannelUser,
            'userLink',
            'userLink.user.id = :userId AND userLink.channel.id = channel.id', {
              userId: userId,
            })
        .getMany();
  };
  async create(channel: Channel): Promise<Channel> {
    return this.channelRepository.save(channel);
  }

  async findChannelName(data: any): Promise<Channel> {
    return await this.channelRepository.findOne({ Id: data.channelID });
  }

  async removeUser(userId : number, channelId : number) {
    await getConnection()
        .createQueryBuilder()
        .relation(Channel, "users")
        .of(channelId)
        .remove(userId)
  }

  getUserLink = async (channelId: number, userId: number): Promise<ChannelUser | null> => {
    const channel = await this.channelRepository
        .createQueryBuilder('channel')
        .leftJoinAndSelect('channel.userLinks', 'userLinks')
        .where('channel.Id = :channelId AND userLinks.user.id = :userId', {
          channelId: channelId,
          userId: userId
        })
        .getOne() as any;
    if (channel && channel.__userLinks__ && channel.__userLinks__.length) {
      return channel.__userLinks__[0];
    }
    return null
  }

  createChannelUser = async (
      channelId: number,
      userId: number)
      : Promise<ChannelUser> => {
    const channel = await this.getOne(channelId);
    const user = await this.usersRepository.findOne(userId);

    if (channel && user) {
      return this.channelUserRepository.save({
        channel: channel,
        user: user,
        userType: channel.ownerId === user.id ?
            ChannelUserType.Owner :
            ChannelUserType.Member
      })
    } else {
      throw new BadRequestException('User or channel not found');
    }
  }

  async getAdmins(id : number) : Promise<Channel> {
    return await this.channelRepository.findOne(id, {
      relations: ['admins'],
    })
  }

  public getOne = async (id: number): Promise<Channel> => {
    return await this.channelRepository.findOne(id);
  };

}
