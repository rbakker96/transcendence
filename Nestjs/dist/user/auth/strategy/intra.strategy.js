"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntraStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const passport_oauth2_1 = require("passport-oauth2");
const querystring_1 = require("querystring");
const jwt_1 = require("@nestjs/jwt");
const uid = 'f1ef4d09a69740a304c69a96158863d032ce914630ed4dcaa0eb33e6da4ae71f';
const secret = 'f527950c758cff0e38df0b5f734c2636a3fc118ed93354c22f44521fa4ec2373';
const callbackURL = 'http://localhost:8000/api/auth/login';
const state = 'xqm5wXX';
let IntraStrategy = class IntraStrategy extends passport_1.PassportStrategy(passport_oauth2_1.Strategy, 'intra') {
    constructor(authService, http, jwtService) {
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?${querystring_1.stringify({
                client_id: uid,
                redirect_uri: callbackURL,
                scope: 'public',
                state: state,
                response_type: 'code',
            })}`,
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: uid,
            clientSecret: secret,
            callbackURL: callbackURL,
            scope: 'public',
        });
        this.authService = authService;
        this.http = http;
        this.jwtService = jwtService;
    }
    async validate(accessToken) {
        const data = await this.http.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        }).toPromise();
        console.log(data.data.id);
        const jwt = await this.jwtService.signAsync({ id: data.data.id });
        console.log(jwt);
        return jwt;
    }
};
IntraStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        common_1.HttpService,
        jwt_1.JwtService])
], IntraStrategy);
exports.IntraStrategy = IntraStrategy;
//# sourceMappingURL=intra.strategy.js.map