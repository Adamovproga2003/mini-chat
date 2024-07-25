import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { UsersService } from './users/users.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: any): Promise<boolean> {
    const bearerToken = this.extractTokenFromHeader(context);
    if (!bearerToken) {
      throw new UnauthorizedException();
    }
    try {
      const decoded = await this.jwtService.verifyAsync(bearerToken, {
        secret: jwtConstants.secret,
      });

      const user = await this.userService.findOneBy(decoded.username);
      if (!user) {
        throw new UnauthorizedException();
      }

      // Attach the user to the context
      context.switchToWs().getClient().user = user;
      return true;
    } catch (ex) {
      console.log(ex);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(context: any): string | undefined {
    const [type, token] =
      context.args[0].handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
