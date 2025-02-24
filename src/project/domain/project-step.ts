export class ProjectStep {
  public readonly id: number;
  public readonly projectId: string;
  public readonly workflowId: number;
  public readonly workflowStepId: number;
  public readonly name: string;
  public readonly inputs: Map<string, any>;

  constructor(
    id: number,
    projectId: string,
    workflowId: number,
    workflowStepId: number,
    name: string,
    inputs: Map<string, any>,
  ) {
    this.id = id;
    this.projectId = projectId;
    this.workflowId = workflowId;
    this.workflowStepId = workflowStepId;
    this.name = name;
    this.inputs = inputs;
  }
}
