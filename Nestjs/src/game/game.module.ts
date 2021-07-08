import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./game.entity";
import { GameService } from "./game.service";
import { AuthService } from "../user/auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../user/auth/models/constants";
import {UserModule} from "../user/user.module";
import {AuthModule} from "../user/auth/auth.module";
import {GameController} from "./game.controller";

@Module({
	imports: [
		UserModule,
		AuthModule,
		TypeOrmModule.forFeature([Game]),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1h' },
		}),
	],
	controllers: [GameController],
	providers: [GameGateway, GameService, AuthService]
})
export class GameModule {}