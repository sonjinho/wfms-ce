import { WorkflowNode } from 'src/workflow-core/domain/workflow-node';
import { WorkflowNodeType } from 'src/workflow-core/domain/workflow-node-type';
import { SearchWorkflowNodeQuery } from './search.workflow-node.query';

export interface WorkflowNodeUseCase {
  load(id: string): Promise<WorkflowNode>;
  loadByType(id: string, nodeType: WorkflowNodeType);
  loadByWorkflow(workflowId: string): Promise<WorkflowNode[]>;
  search(query: SearchWorkflowNodeQuery): Promise<WorkflowNode[]>;
  create(node: WorkflowNode): Promise<WorkflowNode>;
  update(id: string, node: WorkflowNode): Promise<WorkflowNode>;
  delete(id: string): Promise<boolean>;
}
export const WorkflowNodeUseCase = Symbol.for('WorkflowNodeUseCase');
