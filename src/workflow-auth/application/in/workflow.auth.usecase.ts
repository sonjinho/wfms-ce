import { WorkflowAuth } from 'src/workflow-auth/domain/workflow-auth';
import { WorkflowPermission } from 'src/workflow-auth/domain/workflow-permissions';

export interface WorkflowAuthUseCase {
  create(workflowAuth: WorkflowAuth): Promise<WorkflowAuth>;
  findAuth(workflowId: number): Promise<WorkflowAuth>;
  update(id: number, workflowAuth: WorkflowAuth): Promise<WorkflowAuth>;
  remove(id: number): Promise<void>;
  validate(
    group: string,
    requiredPermission: WorkflowPermission,
    workflowId: number,
  ): Promise<boolean>;
}

export const WorkflowAuthUseCase = Symbol.for('WorkflowAuthUseCase');
