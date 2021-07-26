import {BadRequestException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "./channel.entity";
import {DeleteResult,  getRepository, Repository} from "typeorm";
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


  async login(id : number) : Promise<Channel> {
    const channelUsers =  await getRepository(Channel)
        .createQueryBuilder("channel")
        .where("channel.Id = :Id", { Id : id})
        .getOne();
    return channelUsers;
  }

  public getAll = async (userId: any): Promise<Channel[]> => {
    return await this.channelRepository
        .createQueryBuilder('channel')
        .leftJoinAndMapOne('channel.userLinks',
            ChannelUser,
            'userLink',
            'userLink.user.id = :userId AND userLink.channel.Id = channel.Id', {
              userId: userId.userId,
            })
        .getMany();
  };
  async create(channel: Channel): Promise<Channel> {
    return this.channelRepository.save(channel);
  }

  async findChannelName(data: any): Promise<Channel> {
    return await this.channelRepository.findOne({ Id: data.channelID });
  }

  deleteChannelUser = async (userId: number, channelId : number): Promise<DeleteResult> => {
    const channel = await this.getOne(channelId);
    const user = await this.usersRepository.findOne(userId);

    if (channel && user) {
      return await this.channelUserRepository.delete({
        channel: channel,
        user: user
      });
    }
    if (!await this.ExistsInChannelUsers(channelId))
      await this.deleteChannel(channelId);
    return null;
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

  getChannelUsers = async (channelId: number): Promise<ChannelUser[]> => {
    const channel = await this.channelRepository
        .createQueryBuilder('channel')
        .innerJoinAndSelect('channel.userLinks', 'userLinks')
        .innerJoinAndSelect('userLinks.user', 'user')
        .where('channel.Id = :channelId', {channelId: channelId})
        .getOne() as any;
    if (channel) {
      return channel.__userLinks__;
    }
    return null;
  }

  test = async (userId: number): Promise<Channel[]> => {
    const channel = await this.channelRepository
        .createQueryBuilder('channel')
        .innerJoinAndSelect('channel.userLinks', 'userLinks')
        .innerJoinAndSelect('userLinks.user', 'user')
        .where('user.id = :userId', {userId: userId})
        .getMany() as any;
    if (channel) {
      return channel;
    }
    return null;
  }

  public getOne = async (id: number): Promise<Channel> => {
    return await this.channelRepository.findOne(id);
  };

  public ExistsInChannelUsers = async (channelId: number): Promise<ChannelUser> => {
    return await this.channelUserRepository.findOne(channelId);
  };

  public deleteChannel = async (id: number) => {
    return await this.channelRepository.delete(id);
  }

  public getIsAdmin = async (userId: number, channelId : number) => {
   const channelUserType : ChannelUser = await this.channelUserRepository
       .createQueryBuilder('channelUsers')
       .where('channelUsers.userId = :userId',
           {
             userId: userId
       })
       .andWhere('channelUsers.channelId = :channelId',
           {
             channelId: channelId
           })
       .getOne();
   if (channelUserType)
   {
     if (channelUserType.userType === 2)
       return true;
     else
       return false
   }
  }

  updateChannelUser = async (newstate : number, channelId : number, userId : number) => {
    const channelUserType : ChannelUser = await this.channelUserRepository
        .createQueryBuilder('channelUsers')
        .where('channelUsers.userId = :userId',
            {
              userId: userId
            })
        .andWhere('channelUsers.channelId = :channelId',
            {
              channelId: channelId
            })
        .getOne();
    return this.channelUserRepository.update(channelUserType, {userType: newstate})
  }

  updatePassword = async (newPassword: string, channelId : number) => {
    console.log("new password =", newPassword);
    console.log("channelID = ", channelId);
    const channel : Channel = await this.channelRepository
        .createQueryBuilder('channel')
        .where('channel.Id = :channelId',
            {
              channelId: channelId
            })
        .getOne();
    return this.channelRepository.update(channel, {Password: newPassword, IsPrivate: true})
  }
}
