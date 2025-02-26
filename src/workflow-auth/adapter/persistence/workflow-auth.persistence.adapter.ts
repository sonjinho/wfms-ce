/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoadWorkflowAuthPort } from 'src/workflow-auth/application/out/load.workflow-auth.port';
import { UpdateWorkflowAuthPort } from 'src/workflow-auth/application/out/update.workflow-auth.port';
import { WorkflowAuth } from 'src/workflow-auth/domain/workflow-auth';
import { Repository } from 'typeorm';
import { WorkflowAuthEntity } from './entity/workflow-auth.entity';
import { mapToWorkflowAuthDomain } from './entity/workflow-auth.mapper';

@Injectable()
export class WorkflowAuthPersistenceAdapter
  implements LoadWorkflowAuthPort, UpdateWorkflowAuthPort
{
  constructor(
    @InjectRepository(WorkflowAuthEntity)
    private workflowAuthRepository: Repository<WorkflowAuthEntity>,
  ) {}

  async findAuth(workflowId: number): Promise<WorkflowAuth> {
    const workflowAuth = await this.workflowAuthRepository.findOne({
      where: {
        workflow: {
          id: workflowId,
        },
      },
    });
    if (!workflowAuth) {
      throw new Error('WorkflowAuth not found');
    }
    return mapToWorkflowAuthDomain(workflowAuth);
  }
  create(workflowAuth: WorkflowAuth): Promise<WorkflowAuth> {
    throw new Error('Method not implemented.');
  }
  update(id: number, workflowAuth: WorkflowAuth): Promise<WorkflowAuth> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
