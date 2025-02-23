import { Workflow } from 'src/workflow/domain/workflow';

export class WorkflowDTO {
  id: number;
  name: string;
  tags: Map<string, string>;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(
    id: number,
    name: string,
    tags: Map<string, string>,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDomainModel(workflow: Workflow): WorkflowDTO {
    return new WorkflowDTO(
      workflow.id == null ? 0 : workflow.id,
      workflow.name,
      workflow.tags,
      workflow.createdAt,
      workflow.updatedAt,
    );
  }
}
