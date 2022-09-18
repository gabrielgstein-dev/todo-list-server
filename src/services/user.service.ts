import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';

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
      where: { email: email, password: password },
    });
  }
}
