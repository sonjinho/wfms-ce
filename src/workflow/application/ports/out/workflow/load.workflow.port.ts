import { Workflow } from 'src/workflow/domain/workflow';

export interface LoadWorkflowPort {
  findOne(id: number): Promise<Workflow>;
  findAll(): Promise<Workflow[]>;
}

export const LoadWorkflowPort = Symbol.for('LoadWorkflowPort');
