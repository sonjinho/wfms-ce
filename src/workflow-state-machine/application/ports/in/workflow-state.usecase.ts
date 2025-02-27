import { WorkflowState } from 'src/workflow-state-machine/domain/workflow-state';
import { WorkflowTransition } from 'src/workflow-state-machine/domain/workflow-transition';

export interface WorkflowStateUseCase {
  execute(stepId: number): Promise<WorkflowTransition>;
  loadByStep(stepId: number): Promise<WorkflowState>;
  load(id: number): Promise<WorkflowState>;
  save(workflowState: WorkflowState): Promise<WorkflowState>;
  update(workflowState: WorkflowState): Promise<WorkflowState>;
  delete(id: number): void;
}

export const WorkflowStateUseCase = Symbol.for('WorkflowStateUseCase');
