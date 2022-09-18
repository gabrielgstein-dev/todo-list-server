import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  async findProjectsAndTasksByUserId(userId: number) {
    return await this.projectRepo.find({
      where: { userId: userId },
      relations: ['taskList'],
    });
  }
}
