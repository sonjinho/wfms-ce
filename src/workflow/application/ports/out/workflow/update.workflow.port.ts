import { Workflow } from 'src/workflow/domain/workflow';
import { CreateWorkflowCommand } from '../../in/workflow/create.workflow.command';
import { UpdateWorkflowCommand } from '../../in/workflow/update.workflow.command';

export interface UpdateWorkflowPort {
  create(createCommand: CreateWorkflowCommand): Promise<Workflow>;
  update(id: number, updateCommand: UpdateWorkflowCommand): Promise<Workflow>;
  remove(id: number): Promise<void>;
}
export const UpdateWorkflowPort = Symbol.for('UpdateWorkflowPort');
