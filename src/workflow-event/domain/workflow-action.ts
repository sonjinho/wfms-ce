export class WorkflowAction {
  public readonly id?: string;
  public readonly workflowId: number;
  public readonly name: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(id: string, workflowId: number, name: string, createdAt: Date) {
    this.id = id;
    this.workflowId = workflowId;
    this.name = name;
    this.createdAt = createdAt;
  }
}
