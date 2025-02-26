/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { WorkflowAuth } from 'src/workflow-auth/domain/workflow-auth';
import { WorkflowPermission } from 'src/workflow-auth/domain/workflow-permissions';
import { WorkflowAuthUseCase } from '../in/workflow.auth.usecase';
import { WorkflowUseCase } from '../../../workflow/application/ports/in/workflow/workflow.usecase';
import { LoadWorkflowAuthPort } from '../out/load.workflow-auth.port';
import { UpdateWorkflowAuthPort } from '../out/update.workflow-auth.port';
@Injectable()
export class WorkflowAuthService implements WorkflowAuthUseCase {
  constructor(
    @Inject(LoadWorkflowAuthPort)
    private loadWorkflowAuthPort: LoadWorkflowAuthPort,
    @Inject(UpdateWorkflowAuthPort)
    private updateWorkflowAuthPort: UpdateWorkflowAuthPort,
    @Inject(WorkflowUseCase)
    private workflowUseCase: WorkflowUseCase,
  ) {}
  async create(workflowAuth: WorkflowAuth): Promise<WorkflowAuth> {
    const workflowId = workflowAuth.workflowId;
    const workflow = await this.workflowUseCase.findOne(workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    return this.updateWorkflowAuthPort.create(workflowAuth);
  }
  findAuth(workflowId: number): Promise<WorkflowAuth> {
    return this.loadWorkflowAuthPort.findAuth(workflowId);
  }
  async update(id: number, workflowAuth: WorkflowAuth): Promise<WorkflowAuth> {
    const existAuth = await this.loadWorkflowAuthPort.findAuth(
      workflowAuth.workflowId,
    );

    if (!existAuth) {
      throw new Error('WorkflowAuth not found');
    }

    return this.updateWorkflowAuthPort.update(id, workflowAuth);
  }
  remove(id: number): Promise<void> {
    return this.updateWorkflowAuthPort.remove(id);
  }
  async validate(
    group: string,
    requiredPermission: WorkflowPermission,
    workflowId: number,
  ): Promise<boolean> {
    const auth = await this.loadWorkflowAuthPort.findAuth(workflowId);
    return auth.hasGroupPermission(group, requiredPermission);
  }
}
