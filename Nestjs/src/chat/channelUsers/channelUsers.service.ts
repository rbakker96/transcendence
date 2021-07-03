import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ChannelUsers} from './channelUsers.entity';



@Injectable()
export class ChannelUsersService {
    constructor(@InjectRepository(ChannelUsers) private readonly channelUsersRepository: Repository<ChannelUsers>) {}

    async all() : Promise<ChannelUsers[]> {
        return this.channelUsersRepository.find(); // volgens mij moet hier het ID ook worden gespecificeerd
    }

    async create(channelUser : ChannelUsers) : Promise<ChannelUsers> {
        return this.channelUsersRepository.save(channelUser);
    }

}