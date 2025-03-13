/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { Workflow } from 'src/workflow-core/domain/workflow';
import { SearchWorkflowQuery } from '../port/in/search-workflow.query';
import { WorkflowUseCase } from '../port/in/workflow.usecase';
import { WorkflowPort } from '../port/out/workflow.port';

@Injectable()
export class WorkflowService implements WorkflowUseCase {
  constructor(
    @Inject(WorkflowPort) private readonly workflowPort: WorkflowPort,
  ) {}

  search(query: SearchWorkflowQuery): Promise<Workflow[]> {
    return this.workflowPort.search();
  }
  load(id: string): Promise<Workflow> {
    return this.workflowPort.load(id);
  }
  create(workflow: Workflow): Promise<Workflow> {
    return this.workflowPort.create(workflow);
  }
  delete(id: string): Promise<boolean> {
    return this.workflowPort.delete(id);
  }
  async update(id: string, workflow: Workflow): Promise<Workflow> {
    const existItem = await this.workflowPort.load(id);
    return await this.workflowPort.update(existItem.id, workflow);
  }
}
