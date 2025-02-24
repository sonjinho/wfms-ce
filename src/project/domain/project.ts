import { WorkflowStep } from 'src/workflow/domain/workflow.step';
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
  public readonly name: string;
  public readonly workflowId: number;
  public readonly inputs?: Map<string, any>;
  public readonly current: WorkflowStep;
  public readonly status: ProjectStatus;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;

  constructor(
    id: string,
    name: string,
    workflowId: number,
    inputs: Map<string, any>,
    createdAt: Date,
  ) {
    this.id = id || uuid();
    this.name = name;
    this.workflowId = workflowId;
    this.inputs = inputs;
    this.createdAt = createdAt || new Date();
  }
}
