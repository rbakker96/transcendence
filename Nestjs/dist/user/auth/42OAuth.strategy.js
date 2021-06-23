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
exports.DiscordStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_oauth2_1 = require("passport-oauth2");
const querystring_1 = require("querystring");
const clientID = '856872890695417877';
const clientSecret = 'a2a0b4cd7c27f3a3f47867b7e687d6530498ffa839b313f24c2e24e4956bd5f3';
const callbackURL = 'http://localhost:8080/auth/discord';
let DiscordStrategy = class DiscordStrategy extends passport_1.PassportStrategy(passport_oauth2_1.Strategy, 'discord') {
    constructor(authService, http) {
        super({
            authorizationURL: `https://discordapp.com/api/oauth2/authorize?${querystring_1.stringify({
                client_id: clientID,
                redirect_uri: callbackURL,
                response_type: 'code',
                scope: 'identify',
            })}`,
            tokenURL: 'https://discordapp.com/api/oauth2/token',
            scope: 'identify',
            clientID,
            clientSecret,
            callbackURL,
        });
        this.authService = authService;
        this.http = http;
    }
    async validate(accessToken) {
        const { data } = await this.http.get('https://discordapp.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .toPromise();
        return this.authService.findUserFromDiscordId(data.id);
    }
};
DiscordStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        common_1.HttpService])
], DiscordStrategy);
exports.DiscordStrategy = DiscordStrategy;
//# sourceMappingURL=42OAuth.strategy.js.map