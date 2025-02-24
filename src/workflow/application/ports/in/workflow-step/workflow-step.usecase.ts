import { WorkflowStep } from 'src/workflow/domain/workflow.step';

export interface WorkflowStepUseCase {
  create(step: WorkflowStep): Promise<WorkflowStep>;
  findAll(workflowId: number): Promise<WorkflowStep[]>;
  findOne(id: number): Promise<WorkflowStep>;
  update(id: number, workflowStep: WorkflowStep): Promise<WorkflowStep>;
  remove(id: number): Promise<void>;
}

export const WorkflowStepUseCase = Symbol.for('WorkflowStepUseCase');
