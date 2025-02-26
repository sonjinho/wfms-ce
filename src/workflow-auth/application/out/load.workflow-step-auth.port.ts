import { WorkflowStepAuth } from 'src/workflow-auth/domain/workflow-step-auth';

export interface LoadWorkflowStepAuthPort {
  findAuth(workflowId: number): Promise<WorkflowStepAuth>;
}
export const LoadWorkflowStepAuthPort = Symbol.for('LoadWorkflowStepAuthPort');
