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
exports.ChatMessageController = void 0;
const common_1 = require("@nestjs/common");
const chatMessage_service_1 = require("./chatMessage.service");
const chatMessage_dto_1 = require("./dto/chatMessage.dto");
let ChatMessageController = class ChatMessageController {
    constructor(chatMessageService) {
        this.chatMessageService = chatMessageService;
    }
    async getAllChatMessages() {
        return await this.chatMessageService.findAllChatMessages();
    }
    async createChatMessage(message) {
        console.log(message);
        return await this.chatMessageService.createChatMessage(message);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatMessageController.prototype, "getAllChatMessages", null);
__decorate([
    common_1.Post("newMessage"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatMessage_dto_1.ChatMessageDto]),
    __metadata("design:returntype", Promise)
], ChatMessageController.prototype, "createChatMessage", null);
ChatMessageController = __decorate([
    common_1.Controller("chatMessage"),
    __metadata("design:paramtypes", [chatMessage_service_1.ChatMessageService])
], ChatMessageController);
exports.ChatMessageController = ChatMessageController;
//# sourceMappingURL=chatMessage.controller.js.map