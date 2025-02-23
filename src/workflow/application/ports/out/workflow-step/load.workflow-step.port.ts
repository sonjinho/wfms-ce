import { WorkflowStep } from 'src/workflow/domain/workflow.step';

export interface LoadWorkflowStepPort {
  findOne(id: number): Promise<WorkflowStep>;
  findAll(workflowId: number): Promise<WorkflowStep[]>;
}

export const LoadWorkflowStepPort = Symbol.for('LoadWorkflowStepPort');
