import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowAuthPersistenceAdapter } from './adapter/persistence/workflow-auth/workflow-auth.persistence.adapter';
import { WorkflowStepAuthPersistenceAdapter } from './adapter/persistence/workflow-auth/workflow-step-auth.persistence.adapter';
import { WorkflowEntity } from './adapter/persistence/workflow/entity/workflow.entity';
import { WorkflowStepPersistenceAdapter } from './adapter/persistence/workflow/workflow-step.persistence.adapter';
import { WorkflowPersistenceAdapter } from './adapter/persistence/workflow/workflow.persistence.adpater';
import { WorkflowController } from './adapter/web/workflow.controller';
import { WorkflowStepAuthUseCase } from './application/ports/in/workflow-auth/workflow-step.auth.usecase';
import { WorkflowAuthUseCase } from './application/ports/in/workflow-auth/workflow.auth.usecase';
import { WorkflowStepInputUseCase } from './application/ports/in/workflow-step-input/workflow-step-input.usecase';
import { WorkflowStepUseCase } from './application/ports/in/workflow-step/workflow-step.usecase';
import { WorkflowUseCase } from './application/ports/in/workflow/workflow.usecase';
import { LoadWorkflowAuthPort } from './application/ports/out/workflow-auth/load.workflow-auth.port';
import { LoadWorkflowStepAuthPort } from './application/ports/out/workflow-auth/load.workflow-step-auth.port';
import { UpdateWorkflowAuthPort } from './application/ports/out/workflow-auth/update.workflow-auth.port';
import { UpdateWorkflowStepAuthPort } from './application/ports/out/workflow-auth/update.workflow-step-auth';
import { LoadWorkflowStepPort } from './application/ports/out/workflow-step/load.workflow-step.port';
import { UpdateWorkflowStepPort } from './application/ports/out/workflow-step/update.workflow-step.port';
import { LoadWorkflowPort } from './application/ports/out/workflow/load.workflow.port';
import { UpdateWorkflowPort } from './application/ports/out/workflow/update.workflow.port';
import { WorkflowAuthService } from './application/service/workflow-auth/workflow-auth.service';
import { WorkflowStepAuthService } from './application/service/workflow-auth/workflow-step-auth.service';
import { WorkflowStepService } from './application/service/workflow-step.service';
import { WorkflowService } from './application/service/workflow.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowEntity])],
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
    {
      provide: WorkflowAuthUseCase,
      useClass: WorkflowAuthService,
    },
    {
      provide: WorkflowStepAuthUseCase,
      useClass: WorkflowStepAuthService,
    },
    WorkflowAuthPersistenceAdapter,
    {
      provide: LoadWorkflowAuthPort,
      useClass: WorkflowAuthPersistenceAdapter,
    },
    {
      provide: UpdateWorkflowAuthPort,
      useClass: WorkflowAuthPersistenceAdapter,
    },
    WorkflowStepAuthPersistenceAdapter,
    {
      provide: LoadWorkflowStepAuthPort,
      useClass: WorkflowStepAuthPersistenceAdapter,
    },
    {
      provide: UpdateWorkflowStepAuthPort,
      useClass: WorkflowStepAuthPersistenceAdapter,
    },
  ],
})
export class WorkflowModule {}
