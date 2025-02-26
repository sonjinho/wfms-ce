import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowModule } from 'src/workflow/workflow.module';
import { WorkflowAuthEntity } from './adapter/persistence/entity/workflow-auth.entity';
import { WorkflowStepAuthEntity } from './adapter/persistence/entity/workflow-step-auth.entity';
import { WorkflowAuthPersistenceAdapter } from './adapter/persistence/workflow-auth.persistence.adapter';
import { WorkflowStepAuthPersistenceAdapter } from './adapter/persistence/workflow-step-auth.persistence.adapter';
import { WorkflowStepAuthUseCase } from './application/in/workflow-step.auth.usecase';
import { WorkflowAuthUseCase } from './application/in/workflow.auth.usecase';
import { LoadWorkflowAuthPort } from './application/out/load.workflow-auth.port';
import { LoadWorkflowStepAuthPort } from './application/out/load.workflow-step-auth.port';
import { UpdateWorkflowAuthPort } from './application/out/update.workflow-auth.port';
import { UpdateWorkflowStepAuthPort } from './application/out/update.workflow-step-auth';
import { WorkflowAuthService } from './application/service/workflow-auth.service';
import { WorkflowStepAuthService } from './application/service/workflow-step-auth.service';

@Module({
  imports: [
    WorkflowModule,
    TypeOrmModule.forFeature([WorkflowAuthEntity, WorkflowStepAuthEntity]),
  ],
  controllers: [],
  providers: [
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
export class WorkflowAuthModule {}
