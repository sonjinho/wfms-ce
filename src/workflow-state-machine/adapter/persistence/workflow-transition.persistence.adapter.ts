/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { LoadWorkflowTransitionPort } from 'src/workflow-state-machine/application/ports/out/load.workflow-transition.port';
import { UpdateWorkflowTransitionPort } from 'src/workflow-state-machine/application/ports/out/update.workflow-transition.port';
import { WorkflowTransition } from 'src/workflow-state-machine/domain/workflow-transition';

@Injectable()
export class WorkflowTransitionPersistenceAdapter
  implements LoadWorkflowTransitionPort, UpdateWorkflowTransitionPort
{
  load(id: string): Promise<WorkflowTransition> {
    throw new Error('Method not implemented.');
  }
  loadFromState(stateId: string): Promise<WorkflowTransition[]> {
    throw new Error('Method not implemented.');
  }
  loadToState(stateId: string): Promise<WorkflowTransition[]> {
    throw new Error('Method not implemented.');
  }
  save(transition: WorkflowTransition): Promise<WorkflowTransition> {
    throw new Error('Method not implemented.');
  }
  update(transition: WorkflowTransition): Promise<WorkflowTransition> {
    throw new Error('Method not implemented.');
  }
}
