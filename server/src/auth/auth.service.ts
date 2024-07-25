import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(name, pass) {
    const { password, id, username } = await this.usersService.findOneBy(name);

    const isMatch = await bcrypt.compare(pass, password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: id, username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: CreateUserDto) {
    const userDB = await this.usersService.findOneBy(payload.username);

    if (userDB) {
      throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds);
    const { id, username } = await this.usersService.create({
      ...payload,
      password: hashPass,
    });

    return {
      access_token: await this.jwtService.signAsync({
        sub: id,
        username: username,
      }),
    };
  }
}
