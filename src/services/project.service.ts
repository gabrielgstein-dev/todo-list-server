import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProjectEntity, TaskEntity } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(TaskEntity)
    readonly taskRepo: Repository<TaskEntity>,
  ) {}

  async findProjectsAndTasksByUserId(userId: number) {
    const response = await this.projectRepo.find({
      where: { userId: userId },
      relations: ['taskList'],
    });

    return response;
  }
  async addProject(projectName: string, userId: number) {
    const projectTemplate = this.projectRepo.create({
      name: projectName,
      userId: userId,
    });

    const response = await this.projectRepo.save(projectTemplate);

    return response;
  }

  async addTask({ projectId, taskName, done }) {
    const projectTemplate = this.taskRepo.create({
      name: taskName,
      projectId,
      done,
    });

    const response = await this.taskRepo.save(projectTemplate);

    return response;
  }

  async toggleTask({ taskId, done }) {
    const projectTemplate = await this.taskRepo.update(
      { id: taskId },
      { done },
    );

    return projectTemplate;
  }

  async deleteTask({ taskId }) {
    const projectTemplate = await this.taskRepo.delete({ id: taskId });

    return projectTemplate;
  }
}
