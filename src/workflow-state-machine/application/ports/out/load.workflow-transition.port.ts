import { WorkflowTransition } from 'src/workflow-state-machine/domain/workflow-transition';

export interface LoadWorkflowTransitionPort {
  load(id: string): Promise<WorkflowTransition>;
  loadFromState(stateId: string): Promise<WorkflowTransition[]>;
  loadToState(stateId: string): Promise<WorkflowTransition[]>;
}

export const LoadWorkflowTransitionPort = Symbol.for(
  'LoadWorkflowTransitionPort',
);
