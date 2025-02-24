import { WorkflowAuth } from 'src/workflow/domain/auth/workflow-auth';

export interface LoadWorkflowAuthPort {
  findAuth(workflowId: number): Promise<WorkflowAuth>;
}
export const LoadWorkflowAuthPort = Symbol.for('LoadWorkflowAuthPort');
