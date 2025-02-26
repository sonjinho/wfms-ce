/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { WorkflowStepAuth } from 'src/workflow-auth/domain/workflow-step-auth';
import { WorkflowStepPermission } from 'src/workflow-auth/domain/workflow-step-permissions';
import { WorkflowStepAuthUseCase } from '../in/workflow-step.auth.usecase';
import { WorkflowStepUseCase } from '../../../workflow/application/ports/in/workflow-step/workflow-step.usecase';
import { LoadWorkflowStepAuthPort } from '../out/load.workflow-step-auth.port';
import { UpdateWorkflowStepAuthPort } from '../out/update.workflow-step-auth';

@Injectable()
export class WorkflowStepAuthService implements WorkflowStepAuthUseCase {
  constructor(
    @Inject(LoadWorkflowStepAuthPort)
    private loadWorkflowStepAuthPort: LoadWorkflowStepAuthPort,
    @Inject(UpdateWorkflowStepAuthPort)
    private updateWorkflowStepAuthPort: UpdateWorkflowStepAuthPort,
    @Inject(WorkflowStepUseCase)
    private workflowStepUseCase: WorkflowStepUseCase,
  ) {}

  async create(workflowStepAuth: WorkflowStepAuth): Promise<WorkflowStepAuth> {
    const workflowStep = await this.workflowStepUseCase.findOne(
      workflowStepAuth.workflowStepId,
    );

    if (!workflowStep) {
      throw new Error('Workflow step not found');
    }

    return this.updateWorkflowStepAuthPort.create(workflowStepAuth);
  }
  findAuth(workflowStepId: number): Promise<WorkflowStepAuth> {
    return this.loadWorkflowStepAuthPort.findAuth(workflowStepId);
  }
  async update(
    id: number,
    workflowStepAuth: WorkflowStepAuth,
  ): Promise<WorkflowStepAuth> {
    const existAuth = await this.loadWorkflowStepAuthPort.findAuth(
      workflowStepAuth.workflowStepId,
    );
    if (!existAuth) {
      throw new Error('WorkflowStepAuth not found');
    }
    return this.updateWorkflowStepAuthPort.update(id, workflowStepAuth);
  }
  remove(id: number): Promise<void> {
    return this.updateWorkflowStepAuthPort.remove(id);
  }
  async validate(
    group: string,
    requiredPermission: WorkflowStepPermission,
    workflowStepId: number,
  ): Promise<boolean> {
    const auth = await this.loadWorkflowStepAuthPort.findAuth(workflowStepId);
    return auth.hasGroupPermission(group, requiredPermission);
  }
}
