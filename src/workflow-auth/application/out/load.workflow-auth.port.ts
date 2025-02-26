import { WorkflowAuth } from 'src/workflow-auth/domain/workflow-auth';

export interface LoadWorkflowAuthPort {
  findAuth(workflowId: number): Promise<WorkflowAuth>;
}
export const LoadWorkflowAuthPort = Symbol.for('LoadWorkflowAuthPort');
