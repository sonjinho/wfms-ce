export class UpdateWorkflowCommand {
  constructor(name: string, tags: Map<string, string>) {
    this._name = name;
    this._tags = tags;
  }
  private _name: string;
  private _tags: Map<string, string> = new Map();

  get name(): string {
    return this._name;
  }

  get tags(): Map<string, string> {
    return this._tags;
  }
}
