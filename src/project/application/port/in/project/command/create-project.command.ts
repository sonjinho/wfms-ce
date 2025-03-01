export class CreateProjectCommand {
  constructor(
    public readonly workflowId: number,
    public readonly name: string,
    public readonly handlerId: string,
    public readonly createdAt?: Date,
  ) {}
}
