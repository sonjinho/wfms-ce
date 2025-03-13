import { Workflow } from 'src/workflow-core/domain/workflow';
import { SearchWorkflowQuery } from './search-workflow.query';

export interface WorkflowUseCase {
  load(id: string): Promise<Workflow>;
  search(query: SearchWorkflowQuery): Promise<Workflow[]>;
  create(workflow: Workflow): Promise<Workflow>;
  update(id: string, workflow: Workflow): Promise<Workflow>;
  delete(id: string): Promise<boolean>;
}

export const WorkflowUseCase = Symbol.for('WorkflowUseCase');
