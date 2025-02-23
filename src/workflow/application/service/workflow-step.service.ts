import { Inject, Injectable, Logger } from '@nestjs/common';
import { WorkflowStep } from 'src/workflow/domain/workflow.step';
import { IWorkflowStepUseCase } from '../ports/in/workflow-step/workflow-step.usecase';
import { LoadWorkflowStepPort } from '../ports/out/workflow-step/load.workflow-step.port';
import { UpdateWorkflowStepPort } from '../ports/out/workflow-step/update.workflow-step.port';

@Injectable()
export class WorkflowStepService implements IWorkflowStepUseCase {
  constructor(
    @Inject(LoadWorkflowStepPort)
    private loadWorkflowStepPort: LoadWorkflowStepPort,
    @Inject(UpdateWorkflowStepPort)
    private updateWorkflowStepPort: UpdateWorkflowStepPort,
  ) {}

  private readonly logger = new Logger(WorkflowStepService.name);

  create(step: WorkflowStep): Promise<WorkflowStep> {
    return this.updateWorkflowStepPort.create(step);
  }
  findAll(workflowId: number): Promise<WorkflowStep[]> {
    return this.loadWorkflowStepPort.findAll(workflowId);
  }
  findOne(id: number): Promise<WorkflowStep> {
    return this.loadWorkflowStepPort.findOne(id);
  }
  update(id: number, workflowStep: WorkflowStep): Promise<WorkflowStep> {
    return this.updateWorkflowStepPort.update(id, workflowStep);
  }
  remove(id: number): Promise<void> {
    return this.updateWorkflowStepPort.remove(id);
  }
}
