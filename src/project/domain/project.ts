import { Workflow } from 'src/workflow-core/domain/workflow';
import { WorkflowNode } from 'src/workflow-core/domain/workflow-node';
import { WorkflowNodeState } from 'src/workflow-core/domain/workflow-node-state';
import { v4 as uuid } from 'uuid';

export enum ProjectStatus {
  START = 'START',
  ACTIVE = 'ACTIVE',
  END = 'END',
  ARCHIVED = 'ARCHIVED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
}
export class Project {
  public readonly id: string;
  public readonly handler?: string;
  public readonly name: string;
  public readonly workflowId: string;
  public readonly inputs?: Map<string, any>;
  public readonly current: WorkflowNode;
  public readonly status?: ProjectStatus;
  public readonly state?: WorkflowNodeState;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
  constructor(
    name: string,
    workflowId: string,
    handler: string,
    current: WorkflowNode,
    state: WorkflowNodeState,
    status?: ProjectStatus,
    id?: string,
    inputs?: Map<string, any>,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.id = id ?? uuid();
    this.name = name;
    this.workflowId = workflowId;
    this.handler = handler;
    this.inputs = inputs;
    this.current = current;
    this.status = status ?? ProjectStatus.START;
    this.state = state;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static init(
    name: string,
    handlerId: string,
    workflow: Workflow,
    state: WorkflowNodeState,
  ) {
    return new Project(name, workflow.id, handlerId, workflow.nodes[0], state);
  }
}
