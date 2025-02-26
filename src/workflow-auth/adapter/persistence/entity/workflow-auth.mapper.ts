import { WorkflowAuth } from 'src/workflow-auth/domain/workflow-auth';
import { WorkflowStepAuth } from 'src/workflow-auth/domain/workflow-step-auth';
import { WorkflowAuthEntity } from './workflow-auth.entity';
import { WorkflowStepAuthEntity } from './workflow-step-auth.entity';

export function mapToWorkflowAuthDomain(
  entity: WorkflowAuthEntity,
): WorkflowAuth {
  return new WorkflowAuth(entity.workflow.id, entity.groupPermissions);
}

export function mapToWorkflowStepAuthDomain(
  workflowStepAuth: WorkflowStepAuthEntity,
): WorkflowStepAuth {
  return new WorkflowStepAuth(
    workflowStepAuth.workflowStep,
    workflowStepAuth.groupPermissions,
  );
}
