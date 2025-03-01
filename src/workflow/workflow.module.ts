import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowStateMachineModule } from 'src/workflow-state-machine/workflow-state-machine.module';
import { WorkflowStepInputEntity } from './adapter/persistence/entity/workflow-step-input.entity';
import { WorkflowStepEntity } from './adapter/persistence/entity/workflow-step.entity';
import { WorkflowEntity } from './adapter/persistence/entity/workflow.entity';
import { WorkflowStepInputPersistenceAdapter } from './adapter/persistence/workflow-step-input.persistence.adapter';
import { WorkflowStepPersistenceAdapter } from './adapter/persistence/workflow-step.persistence.adapter';
import { WorkflowPersistenceAdapter } from './adapter/persistence/workflow.persistence.adpater';
import { WorkflowController } from './adapter/web/workflow.controller';
import { WorkflowStepInputUseCase } from './application/ports/in/workflow-step-input/workflow-step-input.usecase';
import { WorkflowStepUseCase } from './application/ports/in/workflow-step/workflow-step.usecase';
import { WorkflowUseCase } from './application/ports/in/workflow/workflow.usecase';
import { LoadWorkflowStepInputPort } from './application/ports/out/workflow-step-input/load.workflow-step-input.port';
import { UpdateWorkflowStepInputPort } from './application/ports/out/workflow-step-input/update.workflow-step-input.port';
import { LoadWorkflowStepPort } from './application/ports/out/workflow-step/load.workflow-step.port';
import { UpdateWorkflowStepPort } from './application/ports/out/workflow-step/update.workflow-step.port';
import { LoadWorkflowPort } from './application/ports/out/workflow/load.workflow.port';
import { UpdateWorkflowPort } from './application/ports/out/workflow/update.workflow.port';
import { WorkflowStepInputService } from './application/service/workflow-step-input.service';
import { WorkflowStepService } from './application/service/workflow-step.service';
import { WorkflowService } from './application/service/workflow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkflowEntity,
      WorkflowStepEntity,
      WorkflowStepInputEntity,
    ]),
    WorkflowStateMachineModule,
  ],
  controllers: [WorkflowController],
  providers: [
    {
      provide: WorkflowUseCase,
      useClass: WorkflowService,
    },
    WorkflowPersistenceAdapter,
    {
      provide: LoadWorkflowPort,
      useClass: WorkflowPersistenceAdapter,
    },
    {
      provide: UpdateWorkflowPort,
      useClass: WorkflowPersistenceAdapter,
    },
    {
      provide: WorkflowStepUseCase,
      useClass: WorkflowStepService,
    },
    WorkflowStepPersistenceAdapter,
    {
      provide: LoadWorkflowStepPort,
      useClass: WorkflowStepPersistenceAdapter,
    },
    {
      provide: UpdateWorkflowStepPort,
      useClass: WorkflowStepPersistenceAdapter,
    },
    {
      provide: WorkflowStepInputUseCase,
      useClass: WorkflowStepInputService,
    },
    WorkflowStepInputPersistenceAdapter,
    {
      provide: LoadWorkflowStepInputPort,
      useClass: WorkflowStepInputPersistenceAdapter,
    },
    {
      provide: UpdateWorkflowStepInputPort,
      useClass: WorkflowStepInputPersistenceAdapter,
    },
  ],
  exports: [WorkflowUseCase, WorkflowStepUseCase, WorkflowStepInputUseCase],
})
export class WorkflowModule {}
