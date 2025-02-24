import { WorkflowStepInput } from 'src/workflow/domain/workflow-step-input';

export interface WorkflowStepInputUseCase {
  findByWorkflowId(workflowId: number): Promise<WorkflowStepInput[]>;
  findByStepId(stepId: number): Promise<WorkflowStepInput[]>;
  findById(id: number): Promise<WorkflowStepInput>;
  create(input: WorkflowStepInput): Promise<WorkflowStepInput>;
  remove(id: number): Promise<void>;
  update(id: number, input: WorkflowStepInput): Promise<WorkflowStepInput>;
}

export const WorkflowStepInputUseCase = Symbol.for('WorkflowStepInputUseCase');
