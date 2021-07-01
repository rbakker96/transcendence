import {Controller, Get, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";

@Controller('users')
export class UserController {

    constructor( private userService: UserService ) {}

    @Get()
    async all(): Promise<User[]> {
        return this.userService.all();
    }

  @Get("findName")
  async findUserName(@Query() query): Promise<User> {
    console.log(query);

    return await this.userService.findUserName(query);
  }
}
