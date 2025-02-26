import { WorkflowStepAuth } from 'src/workflow-auth/domain/workflow-step-auth';

export interface UpdateWorkflowStepAuthPort {
  remove(id: number): Promise<void>;
  update(
    id: number,
    workflowStepAuth: WorkflowStepAuth,
  ): Promise<WorkflowStepAuth>;
  create(WorkflowStepAuth: WorkflowStepAuth): Promise<WorkflowStepAuth>;
}

export const UpdateWorkflowStepAuthPort = Symbol.for(
  'UpdateWorkflowStepAuthPort',
);
