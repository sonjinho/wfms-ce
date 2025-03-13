import { Inject, Injectable } from '@nestjs/common';
import { FormNode, WorkflowNode } from 'src/workflow-core/domain/workflow-node';
import { WorkflowNodeType } from 'src/workflow-core/domain/workflow-node-type';
import { WorkflowNodeUseCase } from '../port/in/workflw-node.usecase';

@Injectable()
export class FormNodeService {
  constructor(
    @Inject(WorkflowNodeUseCase)
    private readonly workflowNodeUseCase: WorkflowNodeUseCase,
  ) {}
  async load(id: string): Promise<FormNode> {
    const formNode = await this.workflowNodeUseCase.load(id);
    if (this.isFormNode(formNode)) {
      return formNode;
    }
    throw new Error('Node is not a form node');
  }

  async create(node: FormNode): Promise<FormNode> {
    const formNode = await this.workflowNodeUseCase.create(node);
    if (this.isFormNode(formNode)) {
      return formNode;
    }
    throw new Error('Node is not a form node');
  }

  async update(id: string, node: FormNode): Promise<FormNode> {
    const formNode = await this.workflowNodeUseCase.update(id, node);
    if (this.isFormNode(formNode)) {
      return formNode;
    }
    throw new Error('Node is not a form node');
  }

  delete(id: string): Promise<boolean> {
    return this.workflowNodeUseCase.delete(id);
  }

  isFormNode(node: WorkflowNode): node is FormNode {
    return node && node.nodeType === WorkflowNodeType.FORM;
  }
}
