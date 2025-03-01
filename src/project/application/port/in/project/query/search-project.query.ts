import { ProjectStatus } from 'src/project/domain/project';

export class SearchProjectQuery {
  constructor(
    public readonly workflowId?: number,
    public readonly status?: ProjectStatus,
    public readonly from?: Date,
    public readonly to?: Date,
  ) {}
}
