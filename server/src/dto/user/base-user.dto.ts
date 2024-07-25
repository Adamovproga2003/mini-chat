import { ApiProperty } from '@nestjs/swagger';

export class BaseUser {
  @ApiProperty()
  sub: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
