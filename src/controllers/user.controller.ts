import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../guards/auth.guard';
import { AuthHelper } from '../helpers/auth.helper';

@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Post('login')
  async login(email: string, password: string) {
    const user = await this.userService.authenticate(email, password);
    if (!user) {
      throw new HttpException('INVALID_USER', 401);
    }
    return {
      token: AuthHelper.signJwt({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
