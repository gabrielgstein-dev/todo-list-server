import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
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
  async login(@Body() body) {
    if (!body?.email) {
      throw new HttpException('INVALID_CREDENTIALS', 400);
    }

    if (!body?.password) {
      throw new HttpException('INVALID_CREDENTIALS', 400);
    }

    const user = await this.userService.authenticate(
      body?.email,
      body.password,
    );
    if (!user) {
      throw new HttpException('INVALID_USER', 401);
    }
    delete user.password;

    return {
      token: await AuthHelper.signJwt({
        id: user.id,
        email: user.email,
      }),
    };
  }
  @Post('register')
  async register(@Body() body) {
    if (body?.password !== body?.passwordConfirmation) {
      throw new HttpException('PASSWORDS_DOESNT_MATCH', 400);
    }

    const user = await this.userService.register(body.email, body.password);
    delete user.password;
    return {
      ...user,
    };
  }
}
