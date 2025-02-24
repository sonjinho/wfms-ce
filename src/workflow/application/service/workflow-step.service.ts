import { Inject, Injectable, Logger } from '@nestjs/common';
import { WorkflowStep } from 'src/workflow/domain/workflow.step';
import { WorkflowStepInputUseCase } from '../ports/in/workflow-step-input/workflow-step-input.usecase';
import { WorkflowStepUseCase } from '../ports/in/workflow-step/workflow-step.usecase';
import { LoadWorkflowStepPort } from '../ports/out/workflow-step/load.workflow-step.port';
import { UpdateWorkflowStepPort } from '../ports/out/workflow-step/update.workflow-step.port';

@Injectable()
export class WorkflowStepService implements WorkflowStepUseCase {
  constructor(
    @Inject(LoadWorkflowStepPort)
    private loadWorkflowStepPort: LoadWorkflowStepPort,
    @Inject(UpdateWorkflowStepPort)
    private updateWorkflowStepPort: UpdateWorkflowStepPort,
    @Inject(WorkflowStepInputUseCase)
    private workflowStepInputUseCase: WorkflowStepInputUseCase,
  ) {}

  private readonly logger = new Logger(WorkflowStepService.name);

  async create(step: WorkflowStep): Promise<WorkflowStep> {
    const workflowId = step.workflowId;
    const workflowStep = await this.updateWorkflowStepPort.create(step);

    workflowStep.inputs = await Promise.all(
      step.inputs.map(async (input) => {
        input.workflowId = workflowId;
        input.stepId = workflowStep.id;
        return await this.workflowStepInputUseCase.create(input);
      }),
    );

    return workflowStep;
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
