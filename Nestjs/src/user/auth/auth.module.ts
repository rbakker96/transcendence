import { HttpModule, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from "../user.module";
import { AuthService } from "./auth.service";
import { IntraStrategy } from "./strategy/intra.strategy";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule} from "@nestjs/passport";
import { jwtConstants } from "./models/constants";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        UserModule,
        HttpModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, IntraStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}