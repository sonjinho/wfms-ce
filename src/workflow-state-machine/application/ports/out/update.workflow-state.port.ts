import { WorkflowState } from 'src/workflow-state-machine/domain/workflow-state';

export interface UpdateWorkflowStatePort {
  save(state: WorkflowState): Promise<WorkflowState>;
  update(state: WorkflowState): Promise<WorkflowState>;
}

export const UpdateWorkflowStatePort = Symbol.for('UpdateWorkflowStatePort');
