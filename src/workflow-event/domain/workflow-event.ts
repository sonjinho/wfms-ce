export enum WorkflowEventType {
  START = 1,
  COMPLETE = 2,
  FAILED = 3,
  CANCELLED = 4,
  RESUMED = 5,
  SUSPENDED = 6,
  UPDATED = 7,
}

export class WorkflowEvent {
  public readonly id?: string;
  public readonly workflowId: number;
  public readonly name: string;
  public readonly type: WorkflowEventType;
  public readonly createdAt: Date;

  constructor(
    id: string,
    workflowId: number,
    name: string,
    type: WorkflowEventType,
    createdAt: Date,
  ) {
    this.id = id;
    this.workflowId = workflowId;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
  }
}

// Empty Event
export class WorkflowSimpleEvent {
  public readonly id?: string;
  public readonly name: string;
  public readonly type: WorkflowEventType = WorkflowEventType.COMPLETE;
  public readonly createdAt?: Date;
}
