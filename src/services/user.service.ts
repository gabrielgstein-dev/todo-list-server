import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from 'src/helpers/auth.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepo: Repository<UserEntity>,
  ) {}

  findMany() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOne({
      where: { id: id },
      select: ['id', 'email'],
    });
  }

  findProjectsAndTasks() {
    return this.userRepo.find({
      select: ['id', 'email'],
      relations: ['projectList', 'projectList.taskList'],
    });
  }

  async authenticate(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    return this.userRepo.findOne({
      where: { email: email, password: await AuthHelper.signJwt(password) },
    });
  }

  async register(email: string, password: string): Promise<UserEntity | null> {
    const existUser = await this.userRepo.find({
      where: { email: email },
    });

    if (existUser.length) {
      throw new HttpException('INVALID_PARAMETERS', 400);
    }

    return this.userRepo.save({
      email,
      password: await AuthHelper.signJwt(password),
    });
  }
}
