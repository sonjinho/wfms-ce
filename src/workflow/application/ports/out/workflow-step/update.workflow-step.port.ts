import { WorkflowStep } from 'src/workflow/domain/workflow.step';

export interface UpdateWorkflowStepPort {
  create(workflowStep: WorkflowStep): Promise<WorkflowStep>;
  update(id: number, workflowStep: WorkflowStep): Promise<WorkflowStep>;
  remove(id: number): Promise<void>;
}
export const UpdateWorkflowStepPort = Symbol.for('UpdateWorkflowStepPort');
