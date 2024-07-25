import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './auth/public-strategy';
import { BaseMessage } from './dto/message/base-message.dto';

@ApiTags('chat')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/api/chat')
  @ApiOperation({ summary: 'Get messages from chat' })
  @ApiResponse({
    status: 200,
    description: 'The records found',
    type: [BaseMessage],
  })
  async Chat(@Res() res) {
    const messages = await this.appService.getMessages();
    res.json(
      messages.map(({ id, createdAt, text, user: { username } }) => ({
        id,
        createdAt,
        text,
        username,
      })),
    );
  }
}
