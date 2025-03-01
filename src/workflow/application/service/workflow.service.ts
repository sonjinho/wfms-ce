import { Inject, Injectable, Logger } from '@nestjs/common';
import { Workflow } from 'src/workflow/domain/workflow';
import { WorkflowStepUseCase } from '../ports/in/workflow-step/workflow-step.usecase';
import { CreateWorkflowCommand } from '../ports/in/workflow/create.workflow.command';
import { UpdateWorkflowCommand } from '../ports/in/workflow/update.workflow.command';
import { WorkflowUseCase } from '../ports/in/workflow/workflow.usecase';
import { LoadWorkflowPort } from '../ports/out/workflow/load.workflow.port';
import { UpdateWorkflowPort } from '../ports/out/workflow/update.workflow.port';

@Injectable()
export class WorkflowService implements WorkflowUseCase {
  constructor(
    @Inject(LoadWorkflowPort) private loadWorkflowPort: LoadWorkflowPort,
    @Inject(UpdateWorkflowPort) private updateWorkflowPort: UpdateWorkflowPort,
    @Inject(WorkflowStepUseCase)
    private workflowStepService: WorkflowStepUseCase,
  ) {}

  private readonly logger = new Logger(WorkflowService.name);

  create(createCommand: CreateWorkflowCommand): Promise<Workflow> {
    this.logger.log(createCommand);
    return this.updateWorkflowPort.create(createCommand);
  }
  findAll(): Promise<Workflow[]> {
    return this.loadWorkflowPort.findAll();
  }
  load(id: number): Promise<Workflow> {
    return this.loadWorkflowPort.findOne(id);
  }
  update(id: number, updateCommand: UpdateWorkflowCommand): Promise<Workflow> {
    this.logger.log(updateCommand);
    return this.updateWorkflowPort.update(id, updateCommand);
  }
  remove(id: number): Promise<void> {
    this.logger.log(id);
    throw new Error('Method not implemented.');
  }
}
