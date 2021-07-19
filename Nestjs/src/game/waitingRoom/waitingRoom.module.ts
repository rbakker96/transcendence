import { Module } from "@nestjs/common";
import { WaitingRoomGateway } from "./waitingRoom.gateway";
import { GameModule } from "../game.module";
import { GameService } from "../game.service";
import { UserModule } from "../../user/user.module";
import {AuthModule} from "../../user/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Game} from "../game.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../../user/auth/models/constants";

@Module({
    imports: [
        UserModule,
        GameModule,
        AuthModule,
        TypeOrmModule.forFeature([Game]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),],
    providers: [WaitingRoomGateway, GameService],
})
export class WaitingRoomGatewayModule {}