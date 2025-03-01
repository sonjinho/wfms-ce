import { Workflow } from 'src/workflow/domain/workflow';
import { CreateWorkflowCommand } from './create.workflow.command';
import { UpdateWorkflowCommand } from './update.workflow.command';

export interface WorkflowUseCase {
  create(createCommand: CreateWorkflowCommand): Promise<Workflow>;
  findAll(): Promise<Workflow[]>;
  load(id: number): Promise<Workflow>;
  update(id: number, updateCommand: UpdateWorkflowCommand): Promise<Workflow>;
  remove(id: number): Promise<void>;
}

export const WorkflowUseCase = Symbol.for('WorkflowUseCase');
