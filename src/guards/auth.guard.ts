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
        valid = !!(await AuthHelper.verifyBearerToken(bearer));
        const { id }: any = valid;
        const user = await this.userService.findById(id);
        if (!user) {
          valid = false;
        } else {
          request.user = user;
        }
      } catch (error) {
        console.error(error);
      }
    }
    return valid;
  }
}