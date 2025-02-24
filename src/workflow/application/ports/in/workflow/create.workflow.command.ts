export class CreateWorkflowCommand {
  public readonly code: string;
  public readonly name: string;
  public readonly description: string = '';
  public readonly tags: Map<string, string> = new Map<string, string>();
  constructor(
    code: string,
    name: string,
    description: string,
    tags: Map<string, string>,
  ) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.tags = tags;
  }
}
