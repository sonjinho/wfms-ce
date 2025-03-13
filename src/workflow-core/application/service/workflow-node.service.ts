import { Inject, Injectable } from '@nestjs/common';
import { WorkflowNode } from 'src/workflow-core/domain/workflow-node';
import { WorkflowNodeType } from 'src/workflow-core/domain/workflow-node-type';
import { SearchWorkflowNodeQuery } from '../port/in/search.workflow-node.query';
import { WorkflowNodeUseCase } from '../port/in/workflw-node.usecase';
import { WorkflowNodePort } from '../port/out/workflow-node.port';

@Injectable()
export class WorkflowNodeService implements WorkflowNodeUseCase {
  constructor(@Inject() private readonly workflowNodePort: WorkflowNodePort) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search(query: SearchWorkflowNodeQuery): Promise<WorkflowNode[]> {
    throw new Error('Method not implemented.');
  }

  loadByType(id: string, nodeType: WorkflowNodeType) {
    return this.workflowNodePort.loadByType(id, nodeType);
  }

  load(id: string): Promise<WorkflowNode> {
    return this.workflowNodePort.load(id);
  }
  loadByWorkflow(workflowId: string): Promise<WorkflowNode[]> {
    return this.workflowNodePort.loadByWorkflow(workflowId);
  }
  create(node: WorkflowNode): Promise<WorkflowNode> {
    return this.workflowNodePort.create(node);
  }
  update(id: string, node: WorkflowNode): Promise<WorkflowNode> {
    return this.workflowNodePort.update(id, node);
  }
  delete(id: string): Promise<boolean> {
    return this.workflowNodePort.delete(id);
  }
}
