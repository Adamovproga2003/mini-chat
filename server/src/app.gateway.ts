import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsGuard } from './app.guard';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';

export interface CustomSocket extends Socket {
  user: UserEntity;
}

@WebSocketGateway({
  cors: {
    origin: `*`,
    methods: ['GET', 'POST'],
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private appService: AppService) {}

  @WebSocketServer() server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() payload: { text: string },
  ): Promise<void> {
    const {
      id,
      createdAt,
      text,
      user: { username },
    } = await this.appService.createMessage({
      text: payload.text,
      username: client.user.username,
    });
    this.server.emit('recMessage', { id, createdAt, text, username });
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
  }
}
