import { WorkflowState } from 'src/workflow-state-machine/domain/workflow-state';
import { Workflow } from 'src/workflow/domain/workflow';
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
  public readonly handler?: string;
  public readonly name: string;
  public readonly workflowId: number;
  public readonly inputs?: Map<string, any>;
  public readonly current: WorkflowStep;
  public readonly status: ProjectStatus;
  public readonly state?: WorkflowState;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
  constructor(
    name: string,
    workflowId: number,
    handler: string,
    current: WorkflowStep,
    state: WorkflowState,
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
    state: WorkflowState,
  ) {
    return new Project(name, workflow.id, handlerId, workflow.steps[0], state);
  }
}
