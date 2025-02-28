import { WorkflowTransition } from 'src/workflow-state-machine/domain/workflow-transition';

export interface UpdateWorkflowTransitionPort {
  save(transition: WorkflowTransition): Promise<WorkflowTransition>;
  update(transition: WorkflowTransition): Promise<WorkflowTransition>;
}

export const UpdateWorkflowTransitionPort = Symbol.for(
  'UpdateWorkflowTransitionPort',
);
