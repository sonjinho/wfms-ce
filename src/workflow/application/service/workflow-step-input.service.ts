import { Inject, Injectable, Logger } from '@nestjs/common';
import { WorkflowStepInput } from 'src/workflow/domain/workflow-step-input';
import { IWorkflowStepInputUseCase } from '../ports/in/workflow-step-input/workflow-step-input.usecase';
import { LoadWorkflowStepInputPort } from '../ports/out/workflow-step-input/load.workflow-step-input.port';
import { UpdateWorkflowStepInputPort } from '../ports/out/workflow-step-input/update.workflow-step-input.port';

@Injectable()
export class WorkflowStepInputService implements IWorkflowStepInputUseCase {
  constructor(
    @Inject(LoadWorkflowStepInputPort)
    private loadWorkflowStepInputPort: LoadWorkflowStepInputPort,
    @Inject(UpdateWorkflowStepInputPort)
    private updateWorkflowStepInputPort: UpdateWorkflowStepInputPort,
  ) {}

  private readonly logger = new Logger(WorkflowStepInputService.name);

  findByWorkflowId(workflowId: number): Promise<WorkflowStepInput[]> {
    return this.loadWorkflowStepInputPort.findByWorkflowId(workflowId);
  }
  findByStepId(stepId: number): Promise<WorkflowStepInput[]> {
    return this.loadWorkflowStepInputPort.findByStepId(stepId);
  }
  findById(id: number): Promise<WorkflowStepInput> {
    return this.loadWorkflowStepInputPort.findOne(id);
  }
  create(input: WorkflowStepInput): Promise<WorkflowStepInput> {
    return this.updateWorkflowStepInputPort.create(input);
  }
  remove(id: number): Promise<void> {
    return this.updateWorkflowStepInputPort.remove(id);
  }
  update(id: number, input: WorkflowStepInput): Promise<WorkflowStepInput> {
    return this.updateWorkflowStepInputPort.update(id, input);
  }
}
