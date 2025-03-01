import { WorkflowState } from 'src/workflow-state-machine/domain/workflow-state';
import { WorkflowTransition } from 'src/workflow-state-machine/domain/workflow-transition';

export interface WorkflowStateUseCase {
  initWorkflow(workflowId: number): Promise<WorkflowState>;
  validate(id: number): boolean;
  execute(projectId: string): Promise<WorkflowTransition>;
  loadByStep(stepId: number): Promise<WorkflowState>;
  load(id: number): Promise<WorkflowState>;
  save(workflowState: WorkflowState): Promise<WorkflowState>;
  update(workflowState: WorkflowState): Promise<WorkflowState>;
  delete(id: number): void;
}

export const WorkflowStateUseCase = Symbol.for('WorkflowStateUseCase');
