import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthHelper } from '../helpers/auth.helper';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearer = request.headers.authorization;
    let valid = false;
    if (bearer) {
      try {
        const { id }: any = await AuthHelper.verifyBearerToken(bearer);
        const user = await this.userService.findById(id);
        if (user) {
          request.user = user;
          valid = true;
        }
      } catch (error) {
        console.error(error);
      }
    }
    return valid;
  }
}
