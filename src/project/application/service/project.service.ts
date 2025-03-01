/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { Project } from 'src/project/domain/project';
import { WorkflowStateUseCase } from 'src/workflow-state-machine/application/ports/in/workflow-state.usecase';
import { WorkflowUseCase } from 'src/workflow/application/ports/in/workflow/workflow.usecase';
import { CreateProjectCommand } from '../port/in/project/command/create-project.command';
import { UpdateProjectCommand } from '../port/in/project/command/update-project.command';
import { ProjectUseCase } from '../port/in/project/project.usecase';
import { SearchProjectQuery } from '../port/in/project/query/search-project.query';

@Injectable()
export class ProjectService implements ProjectUseCase {
  constructor(
    @Inject(WorkflowUseCase)
    private readonly workflowUseCase: WorkflowUseCase,
    @Inject(WorkflowStateUseCase)
    private readonly workflowStateUseCase: WorkflowStateUseCase,
  ) {}
  async create(command: CreateProjectCommand): Promise<Project> {
    const workflowId = command.workflowId;
    const workflow = await this.workflowUseCase.load(workflowId);
    const initState = await this.workflowStateUseCase.initWorkflow(workflowId);
    const project = Project.init(
      command.name,
      command.handlerId,
      workflow,
      initState,
    );
    return project;
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
