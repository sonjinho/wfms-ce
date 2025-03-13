import { Workflow } from 'src/workflow-core/domain/workflow';

export interface WorkflowPort {
  search(): Promise<Workflow[]>;
  update(id: string, workflow: Workflow): Promise<Workflow>;
  delete(id: string): Promise<boolean>;
  load(id: string): Promise<Workflow>;
  create(workflow: Workflow): Promise<Workflow>;
}

export const WorkflowPort = Symbol.for('WorkflowPort');
