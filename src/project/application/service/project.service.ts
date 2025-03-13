/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { Project } from 'src/project/domain/project';
import { WorkflowUseCase } from 'src/workflow-core/application/port/in/workflow.usecase';
import { CreateProjectCommand } from '../port/in/project/command/create-project.command';
import { UpdateProjectCommand } from '../port/in/project/command/update-project.command';
import { ProjectUseCase } from '../port/in/project/project.usecase';
import { SearchProjectQuery } from '../port/in/project/query/search-project.query';

@Injectable()
export class ProjectService implements ProjectUseCase {
  constructor(
    @Inject(WorkflowUseCase)
    private readonly workflowUseCase: WorkflowUseCase,
  ) {}
  create(command: CreateProjectCommand): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  update(command: UpdateProjectCommand): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  remove(projectId: string): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  search(query: SearchProjectQuery): Promise<Project[]> {
    throw new Error('Method not implemented.');
  }
  load(projectId: string): Promise<Project> {
    throw new Error('Method not implemented.');
  }
}
