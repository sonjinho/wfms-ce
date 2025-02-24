/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { LoadWorkflowAuthPort } from 'src/workflow/application/ports/out/workflow-auth/load.workflow-auth.port';
import { UpdateWorkflowAuthPort } from 'src/workflow/application/ports/out/workflow-auth/update.workflow-auth.port';
import { WorkflowAuth } from 'src/workflow/domain/auth/workflow-auth';

@Injectable()
export class WorkflowAuthPersistenceAdapter
  implements LoadWorkflowAuthPort, UpdateWorkflowAuthPort
{
  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(id: number, workflowAuth: WorkflowAuth): Promise<WorkflowAuth> {
    throw new Error('Method not implemented.');
  }
  findAuth(workflowId: number): Promise<WorkflowAuth> {
    throw new Error('Method not implemented.');
  }
  create(workflowAuth: WorkflowAuth): Promise<WorkflowAuth> {
    throw new Error('Method not implemented.');
  }
}
