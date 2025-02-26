/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadWorkflowStepAuthPort } from 'src/workflow-auth/application/out/load.workflow-step-auth.port';
import { UpdateWorkflowStepAuthPort } from 'src/workflow-auth/application/out/update.workflow-step-auth';
import { WorkflowStepAuth } from 'src/workflow-auth/domain/workflow-step-auth';
import { Repository } from 'typeorm';
import { WorkflowStepAuthEntity } from './entity/workflow-step-auth.entity';

@Injectable()
export class WorkflowStepAuthPersistenceAdapter
  implements LoadWorkflowStepAuthPort, UpdateWorkflowStepAuthPort
{
  constructor(
    @InjectRepository(WorkflowStepAuthEntity)
    private workflowStepAuthRepository: Repository<WorkflowStepAuthEntity>,
  ) {}
  findAuth(workflowId: number): Promise<WorkflowStepAuth> {
    throw new Error('Method not implemented.');
  }
  create(WorkflowStepAuth: WorkflowStepAuth): Promise<WorkflowStepAuth> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(
    id: number,
    workflowStepAuth: WorkflowStepAuth,
  ): Promise<WorkflowStepAuth> {
    throw new Error('Method not implemented.');
  }
}
