import { User } from 'src/users/domain/user';
import { ProjectStatus } from './project';
import { WorkflowNode } from 'src/workflow-core/domain/workflow-node';
import { WorkflowNodeState } from 'src/workflow-core/domain/workflow-node-state';

export class ProjectInstance {
  public readonly id: string;
  public readonly handler: User;
  public readonly workflowId: number;
  public readonly currentStep?: WorkflowNode;
  public readonly currentState?: WorkflowNodeState;
  public readonly status: ProjectStatus;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
  public readonly data?: Map<string, any>;

  constructor(
    id: string,
    handler: User,
    workflowId: number,
    currentStep?: WorkflowNode,
    currentState?: WorkflowNodeState,
    status?: ProjectStatus,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    data?: Map<string, any>,
  ) {
    this.id = id;
    this.handler = handler;
    this.workflowId = workflowId;
    this.currentStep = currentStep;
    this.currentState = currentState;
    if (status === undefined) status = ProjectStatus.ACTIVE;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.data = data;
  }
}
