import { WorkflowState } from 'src/workflow-state-machine/domain/workflow-state';

export interface LoadWorkflowStatePort {
  load(id: string): Promise<WorkflowState>;
  loadByStepId(stepId: number): Promise<WorkflowState[]>;
}

export const LoadWorkflowStatePort = Symbol.for('LoadWorkflowStatePort');
