import { WorkflowStepInput } from './workflow-step-input';

export class WorkflowStep {
  public readonly id: number;
  public readonly workflowId: number;
  public readonly name: string;
  public readonly description: string;
  public inputs: WorkflowStepInput[];

  constructor(
    id: number,
    workflowId: number,
    name: string,
    description: string,
    inputs: WorkflowStepInput[],
  ) {
    this.id = id;
    this.workflowId = workflowId;
    this.name = name;
    this.description = description;
    this.inputs = inputs;
  }
}
