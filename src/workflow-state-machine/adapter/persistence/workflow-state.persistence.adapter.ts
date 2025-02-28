/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { LoadWorkflowStatePort } from 'src/workflow-state-machine/application/ports/out/load.workflow-state.port';
import { UpdateWorkflowStatePort } from 'src/workflow-state-machine/application/ports/out/update.workflow-state.port';
import { WorkflowState } from 'src/workflow-state-machine/domain/workflow-state';

@Injectable()
export class WorkflowStatePersistenceAdapter
  implements LoadWorkflowStatePort, UpdateWorkflowStatePort
{
  save(state: WorkflowState): Promise<WorkflowState> {
    throw new Error('Method not implemented.');
  }
  update(state: WorkflowState): Promise<WorkflowState> {
    throw new Error('Method not implemented.');
  }
  loadByStepId(stepId: number): Promise<WorkflowState[]> {
    throw new Error('Method not implemented.');
  }
  load(id: string): Promise<WorkflowState> {
    throw new Error('Method not implemented.');
  }
}
