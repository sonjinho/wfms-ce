import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowStepInputEntity } from './adapter/persistence/workflow/entity/workflow-step-input.entity';
import { WorkflowStepEntity } from './adapter/persistence/workflow/entity/workflow-step.entity';
import { WorkflowEntity } from './adapter/persistence/workflow/entity/workflow.entity';
import { WorkflowStepPersistenceAdapter } from './adapter/persistence/workflow/workflow-step.persistence.adapter';
import { WorkflowPersistenceAdapter } from './adapter/persistence/workflow/workflow.persistence.adpater';
import { WorkflowController } from './adapter/web/workflow.controller';
import { WorkflowStepInputUseCase } from './application/ports/in/workflow-step-input/workflow-step-input.usecase';
import { WorkflowStepUseCase } from './application/ports/in/workflow-step/workflow-step.usecase';
import { WorkflowUseCase } from './application/ports/in/workflow/workflow.usecase';
import { LoadWorkflowStepPort } from './application/ports/out/workflow-step/load.workflow-step.port';
import { UpdateWorkflowStepPort } from './application/ports/out/workflow-step/update.workflow-step.port';
import { LoadWorkflowPort } from './application/ports/out/workflow/load.workflow.port';
import { UpdateWorkflowPort } from './application/ports/out/workflow/update.workflow.port';
import { WorkflowStepService } from './application/service/workflow-step.service';
import { WorkflowService } from './application/service/workflow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkflowEntity,
      WorkflowStepEntity,
      WorkflowStepInputEntity,
    ]),
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
      useClass: WorkflowStepService,
    },
  ],
})
export class WorkflowModule {}
