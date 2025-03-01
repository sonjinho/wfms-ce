import { WorkflowStep } from './workflow.step';

export class Workflow {
  public readonly id: number;
  public readonly code: string;
  public readonly name: string;
  public readonly description: string;
  public readonly tags: Map<string, string>;
  public readonly initStepId: number;
  public readonly steps: WorkflowStep[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: number,
    code: string,
    name: string,
    description: string,
    tags: Map<string, string>,
    steps: WorkflowStep[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.steps = steps;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class WorkflowItem {
  public readonly id: number;
  public readonly code: string;
  public readonly name: string;
  public readonly description: string;
  public readonly tags: { [key: string]: string };
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: number,
    code: string,
    name: string,
    description: string,
    tags: { [key: string]: string },
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
