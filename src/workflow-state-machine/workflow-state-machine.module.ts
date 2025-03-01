import { Module } from '@nestjs/common';
import { WorkflowStatePersistenceAdapter } from './adapter/persistence/workflow-state.persistence.adapter';
import { WorkflowTransitionPersistenceAdapter } from './adapter/persistence/workflow-transition.persistence.adapter';
import { WorkflowStateUseCase } from './application/ports/in/workflow-state.usecase';
import { WorkflowTransitionUseCase } from './application/ports/in/workflow-transition.usecase';
import { LoadWorkflowStatePort } from './application/ports/out/load.workflow-state.port';
import { LoadWorkflowTransitionPort } from './application/ports/out/load.workflow-transition.port';
import { UpdateWorkflowStatePort } from './application/ports/out/update.workflow-state.port';
import { UpdateWorkflowTransitionPort } from './application/ports/out/update.workflow-transition.port';
import { WorkflowStateService } from './application/service/workflow-state.service';
import { WorkflowTransitionService } from './application/service/workflow-transition.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: WorkflowStateUseCase,
      useClass: WorkflowStateService,
    },
    WorkflowStatePersistenceAdapter,
    {
      provide: LoadWorkflowStatePort,
      useClass: WorkflowStatePersistenceAdapter,
    },
    {
      provide: UpdateWorkflowStatePort,
      useClass: WorkflowStatePersistenceAdapter,
    },
    {
      provide: WorkflowTransitionUseCase,
      useClass: WorkflowTransitionService,
    },
    {
      provide: WorkflowTransitionUseCase,
      useClass: WorkflowTransitionService,
    },
    WorkflowTransitionPersistenceAdapter,
    {
      provide: LoadWorkflowTransitionPort,
      useClass: WorkflowTransitionPersistenceAdapter,
    },
    {
      provide: UpdateWorkflowTransitionPort,
      useClass: WorkflowTransitionPersistenceAdapter,
    },
  ],
})
export class WorkflowStateMachineModule {}
