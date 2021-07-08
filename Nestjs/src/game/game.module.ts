import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./game.entity";
import { GameService } from "./game.service";
import { AuthController } from "../user/auth/auth.controller";
import { AuthService } from "../user/auth/auth.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Game]),
	],
	controllers: [AuthController, AuthService],
	providers: [GameGateway, GameService]
})
export class GameModule {}