import { WorkflowAuth } from 'src/workflow-auth/domain/workflow-auth';

export interface UpdateWorkflowAuthPort {
  remove(id: number): Promise<void>;
  update(id: number, workflowAuth: WorkflowAuth): Promise<WorkflowAuth>;
  create(workflowAuth: WorkflowAuth): Promise<WorkflowAuth>;
}

export const UpdateWorkflowAuthPort = Symbol.for('UpdateWorkflowAuthPort');
