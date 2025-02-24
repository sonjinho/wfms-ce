import { WorkflowStepAuth } from 'src/workflow/domain/auth/workflow-step-auth';
import { WorkflowStepPermission } from 'src/workflow/domain/auth/workflow-step-permissions';

export interface WorkflowStepAuthUseCase {
  create(workflowStepAuth: WorkflowStepAuth): Promise<WorkflowStepAuth>;
  findAuth(workflowStepId: number): Promise<WorkflowStepAuth>;
  update(
    id: number,
    workflowStepAuth: WorkflowStepAuth,
  ): Promise<WorkflowStepAuth>;
  remove(id: number): Promise<void>;
  validate(
    group: string,
    requiredPermission: WorkflowStepPermission,
    workflowStepId: number,
  ): Promise<boolean>;
}

export const WorkflowStepAuthUseCase = Symbol.for('WorkflowStepAuthUseCase');
