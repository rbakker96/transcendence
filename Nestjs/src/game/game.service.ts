import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "./game.entity";
import { newGameDto } from "./models/newGame.dto";
import { gameStatsDto } from "./models/gameStats.dto";
import { AuthService } from "../user/auth/auth.service";


@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
        private authService: AuthService,
    ) {}

    async all(): Promise<Game[]> {
        return this.gameRepository.find();
    }

    async findOne(id: any): Promise<Game> {
        return this.gameRepository.findOne(id);
    }

    async create(data: newGameDto): Promise<number> {
        const gameData = await this.gameRepository.save(data);

        return gameData.gameID;
    }

    async updateGameURL(gameID: number, data): Promise<any> {
        return await this.gameRepository.update(gameID, {gameURL: data});
    }

    async update(gameID: number, data: gameStatsDto): Promise<any> {
        return await this.gameRepository.update(gameID, data);
    }

}