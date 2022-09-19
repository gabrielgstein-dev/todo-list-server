import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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

  @Post()
  addProject(@Body() body, @Req() request) {
    return this.projectService.addProject(body.name, request.user.id);
  }

  @Post('add-task')
  addTask(@Body() body, @Req() request) {
    return this.projectService.addTask({
      projectId: body.projectId,
      done: body.done,
      taskName: body.name,
    });
  }

  @Post('toggle-task')
  toggleTask(@Body() body, @Req() request) {
    return this.projectService.toggleTask({
      done: body.done,
      taskId: body.id,
    });
  }

  @Post('delete-task')
  deleteTask(@Body() body, @Req() request) {
    return this.projectService.deleteTask({
      taskId: body.id,
    });
  }
}
