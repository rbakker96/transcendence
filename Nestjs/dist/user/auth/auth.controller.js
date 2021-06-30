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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
const register_dto_1 = require("./models/register.dto");
const update_dto_1 = require("./models/update.dto");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./strategy/auth.guard");
let AuthController = class AuthController {
    constructor(userService, jwtService, authService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authService = authService;
    }
    async login(req, response) {
        await response.cookie('clientID', req.user, { httpOnly: true });
        const client = await this.jwtService.verifyAsync(req.user);
        const clientData = await this.userService.findOne(client['id']);
        console.log('clientData', clientData);
        if (!clientData)
            return response.redirect('http://localhost:8080/register');
        if (clientData.authentication == true)
            return response.redirect('http://localhost:8080/twoFactor');
        else
            return response.redirect('http://localhost:8080/profile');
    }
    async register(data, request) {
        const clientID = await this.authService.clientID(request);
        await this.authService.newUser(data, clientID);
    }
    async update(data, request) {
        await this.authService.updateUser(data);
    }
    async getUserData(request) {
        const clientID = await this.authService.clientID(request);
        return await this.userService.findOne(clientID);
    }
    async logout(response) {
        response.clearCookie('clientID');
        return {
            message: 'Success'
        };
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('intra')),
    common_1.Get('auth/login'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.UseGuards(auth_guard_1.verifyUser),
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.UseGuards(auth_guard_1.verifyUser),
    common_1.Put('update'),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
__decorate([
    common_1.UseGuards(auth_guard_1.verifyUser),
    common_1.Get('userData'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserData", null);
__decorate([
    common_1.UseGuards(auth_guard_1.verifyUser),
    common_1.Post('logout'),
    __param(0, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map