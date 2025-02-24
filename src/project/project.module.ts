import { Module } from '@nestjs/common';
import { WorkflowModule } from 'src/workflow/workflow.module';

@Module({
  imports: [WorkflowModule],
  controllers: [],
  providers: [],
})
export class ProjectModule {}
