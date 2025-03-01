export class SubmitProjectStepCommand {
  constructor(
    public readonly projectStepId: string,
    public readonly triggerId: string,
    public readonly inputs: Map<string, any> = new Map(),
  ) {}
}
