/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Inject, Injectable } from '@nestjs/common';
import { WorkflowTransition } from 'src/workflow-state-machine/domain/workflow-transition';
import { WorkflowTransitionUseCase } from '../ports/in/workflow-transition.usecase';
import { LoadWorkflowTransitionPort } from '../ports/out/load.workflow-transition.port';
import { UpdateWorkflowTransitionPort } from '../ports/out/update.workflow-transition.port';

@Injectable()
export class WorkflowTransitionService implements WorkflowTransitionUseCase {
  constructor(
    @Inject(LoadWorkflowTransitionPort)
    private readonly loadWorkflowTransitionPort: LoadWorkflowTransitionPort,
    @Inject(UpdateWorkflowTransitionPort)
    private readonly updateWorkflowTransitionPort: UpdateWorkflowTransitionPort,
  ) {}
  async loadByFromState(fromStateId: string): Promise<WorkflowTransition[]> {
    return await this.loadWorkflowTransitionPort.loadFromState(fromStateId);
  }
  async loadByToState(toStateId: string): Promise<WorkflowTransition[]> {
    return await this.loadWorkflowTransitionPort.loadToState(toStateId);
  }
  async load(id: number): Promise<WorkflowTransition> {
    return await this.loadWorkflowTransitionPort.load(id.toString());
  }
  async save(
    workflowTransition: WorkflowTransition,
  ): Promise<WorkflowTransition> {
    return await this.updateWorkflowTransitionPort.save(workflowTransition);
  }
  async update(
    id: number,
    workflowTransition: WorkflowTransition,
  ): Promise<WorkflowTransition> {
    return await this.updateWorkflowTransitionPort.update(workflowTransition);
  }
  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
