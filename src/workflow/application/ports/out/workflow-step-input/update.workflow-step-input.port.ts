import { WorkflowStepInput } from 'src/workflow/domain/workflow-step-input';

export interface UpdateWorkflowStepInputPort {
  create(workflowStepInput: WorkflowStepInput): Promise<WorkflowStepInput>;
  update(
    id: number,
    workflowStepInput: WorkflowStepInput,
  ): Promise<WorkflowStepInput>;
  remove(id: number): Promise<void>;
}
export const UpdateWorkflowStepInputPort = Symbol.for(
  'UpdateWorkflowStepInputPort',
);
