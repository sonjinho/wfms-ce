import { WorkflowNode } from 'src/workflow-core/domain/workflow-node';
import { WorkflowNodeType } from 'src/workflow-core/domain/workflow-node-type';

export interface WorkflowNodePort {
  loadByType(id: string, nodeType: WorkflowNodeType): Promise<WorkflowNode>;
  loadByWorkflow(workflowId: string): Promise<WorkflowNode[]>;
  load(id: string): Promise<WorkflowNode>;
  create(node: WorkflowNode): Promise<WorkflowNode>;
  update(id: string, node: WorkflowNode): Promise<WorkflowNode>;
  delete(id: string): Promise<boolean>;
}
export const WorkflowNodePort = Symbol.for('WorkflowNodePort');
