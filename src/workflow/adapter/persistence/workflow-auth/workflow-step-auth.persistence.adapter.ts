/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { LoadWorkflowStepAuthPort } from 'src/workflow/application/ports/out/workflow-auth/load.workflow-step-auth.port';
import { UpdateWorkflowStepAuthPort } from 'src/workflow/application/ports/out/workflow-auth/update.workflow-step-auth';
import { WorkflowStepAuth } from 'src/workflow/domain/auth/workflow-step-auth';

@Injectable()
export class WorkflowStepAuthPersistenceAdapter
  implements LoadWorkflowStepAuthPort, UpdateWorkflowStepAuthPort
{
  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(
    id: number,
    workflowStepAuth: WorkflowStepAuth,
  ): Promise<WorkflowStepAuth> {
    throw new Error('Method not implemented.');
  }
  findAuth(workflowId: number): Promise<WorkflowStepAuth> {
    throw new Error('Method not implemented.');
  }
  create(WorkflowStepAuth: WorkflowStepAuth): Promise<WorkflowStepAuth> {
    throw new Error('Method not implemented.');
  }
}
