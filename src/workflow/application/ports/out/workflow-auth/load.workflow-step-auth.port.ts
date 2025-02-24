import { WorkflowStepAuth } from 'src/workflow/domain/auth/workflow-step-auth';

export interface LoadWorkflowStepAuthPort {
  findAuth(workflowId: number): Promise<WorkflowStepAuth>;
}
export const LoadWorkflowStepAuthPort = Symbol.for('LoadWorkflowStepAuthPort');
