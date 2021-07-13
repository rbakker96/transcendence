import { Module } from "@nestjs/common";
import { WaitingRoomGateway } from "./waitingRoom.gateway";

@Module({
    providers: [WaitingRoomGateway],
})
export class WaitingRoomGatewayModule {}