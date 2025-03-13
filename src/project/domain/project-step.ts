import { WorkflowNodeState } from 'src/workflow-core/domain/workflow-node-state';

export class ProjectStep {
  public readonly id?: number;
  public readonly projectId: string;
  public readonly workflowId: number;
  public readonly workflowStepId: number;
  public readonly name: string;
  public readonly inputs: Map<string, any>;
  public readonly state?: WorkflowNodeState;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;

  constructor(
    projectId: string,
    workflowId: number,
    workflowStepId: number,
    name: string,
    inputs: Map<string, any>,
    state?: WorkflowNodeState,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    id?: number,
  ) {
    this.id = id;
    this.projectId = projectId;
    this.workflowId = workflowId;
    this.workflowStepId = workflowStepId;
    this.name = name;
    this.inputs = inputs;
    this.state = state;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
