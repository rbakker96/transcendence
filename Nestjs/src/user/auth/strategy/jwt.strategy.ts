// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException} from '@nestjs/common';
// import { jwtConstants } from '../models/constants';
// import { UserService } from "../../user.service";
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private userService: UserService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: jwtConstants.secret,
//         });
//     }
//
//     async validate(payload: any) {
//         const user = await this.userService.findOne(payload.id);
//
//         if (!user)
//             throw new UnauthorizedException();
//     }
// }