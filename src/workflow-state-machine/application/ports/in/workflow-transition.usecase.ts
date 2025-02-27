import { WorkflowTransition } from 'src/workflow-state-machine/domain/workflow-transition';

export interface WorkflowTransitionUseCase {
  loadByFromState(fromStateId: string): Promise<WorkflowTransition[]>;
  loadByToState(toStateId: string): Promise<WorkflowTransition[]>;
  load(id: number): Promise<WorkflowTransition>;
  save(workflowTransition: WorkflowTransition): Promise<WorkflowTransition>;
  update(
    id: number,
    workflowTransition: WorkflowTransition,
  ): Promise<WorkflowTransition>;
  remove(id: number): Promise<void>;
}

export const WorkflowTransitionUseCase = Symbol.for(
  'WorkflowTransitionUseCase',
);
