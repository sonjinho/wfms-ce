import { Module } from '@nestjs/common';
import { WorkflowCoreModule } from 'src/workflow-core/workflow-core.module';

@Module({
  imports: [WorkflowCoreModule],
  controllers: [],
  providers: [],
})
export class ProjectModule {}
