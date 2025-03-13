import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowNodeConnectionEntity } from './adapter/persistence/entity/workflow-node-connection.entity';
import { WorkflowNodeEntity } from './adapter/persistence/entity/workflow-node.entity';
import { WorkflowEntity } from './adapter/persistence/entity/workflow.entity';
import { WorkflowPersistenceAdapter } from './adapter/persistence/workflow.persistence.adapter';
import { WorkflowUseCase } from './application/port/in/workflow.usecase';
import { WorkflowPort } from './application/port/out/workflow.port';
import { WorkflowService } from './application/service/workflow.service';
import { WorkflowController } from './adapter/web/workflow.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkflowEntity,
      WorkflowNodeEntity,
      WorkflowNodeConnectionEntity,
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
      provide: WorkflowPort,
      useClass: WorkflowPersistenceAdapter,
    },
  ],
  exports: [WorkflowUseCase],
})
export class WorkflowCoreModule {}
