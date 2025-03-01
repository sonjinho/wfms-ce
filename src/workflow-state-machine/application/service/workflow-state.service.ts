/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Inject, Injectable } from '@nestjs/common';
import { WorkflowState } from 'src/workflow-state-machine/domain/workflow-state';
import { WorkflowTransition } from 'src/workflow-state-machine/domain/workflow-transition';
import { WorkflowStateUseCase } from '../ports/in/workflow-state.usecase';
import { LoadWorkflowStatePort } from '../ports/out/load.workflow-state.port';
import { UpdateWorkflowStatePort } from '../ports/out/update.workflow-state.port';

@Injectable()
export class WorkflowStateService implements WorkflowStateUseCase {
  constructor(
    @Inject(LoadWorkflowStatePort)
    private readonly loadWorkflowStatePort: LoadWorkflowStatePort,
    @Inject(UpdateWorkflowStatePort)
    private readonly updateWorkflowStatePort: UpdateWorkflowStatePort,
  ) {}
  initWorkflow(workflowId: number): Promise<WorkflowState> {
    throw new Error('Method not implemented.');
  }
  validate(id: number): boolean {
    throw new Error('Method not implemented.');
  }
  async execute(projectId: string): Promise<WorkflowTransition> {
    throw new Error('Method not implemented.');
  }
  async loadByStep(stepId: number): Promise<WorkflowState> {
    const states = await this.loadWorkflowStatePort.loadByStepId(stepId);
    return states[0];
  }
  async load(id: number): Promise<WorkflowState> {
    return await this.loadWorkflowStatePort.load(id.toString());
  }
  async save(workflowState: WorkflowState): Promise<WorkflowState> {
    return await this.updateWorkflowStatePort.save(workflowState);
  }
  async update(workflowState: WorkflowState): Promise<WorkflowState> {
    return await this.updateWorkflowStatePort.update(workflowState);
  }
  delete(id: number): void {
    throw new Error('Method not implemented.');
  }
}
