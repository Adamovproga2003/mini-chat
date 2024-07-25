import { ApiProperty } from '@nestjs/swagger';

export class BaseMessage {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  text: string;
}
