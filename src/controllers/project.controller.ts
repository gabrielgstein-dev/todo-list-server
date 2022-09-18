import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(readonly projectService: ProjectService) {}

  @Get()
  findProjects(@Req() request) {
    return this.projectService.findProjectsAndTasksByUserId(request.user.id);
  }
}
