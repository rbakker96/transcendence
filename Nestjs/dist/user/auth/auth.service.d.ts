import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    clientID(request: Request): Promise<number>;
}
