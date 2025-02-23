import { WorkflowStepInput } from 'src/workflow/domain/workflow-step-input';

export interface LoadWorkflowStepInputPort {
  findByStepId(stepId: number): Promise<WorkflowStepInput[]>;
  findByWorkflowId(workflowId: number): Promise<WorkflowStepInput[]>;
  findOne(id: number): Promise<WorkflowStepInput>;
}

export const LoadWorkflowStepInputPort = Symbol.for(
  'LoadWorkflowStepInputPort',
);
