import { Module } from '@nestjs/common';
import { WorkflowStateMachineModule } from 'src/workflow-state-machine/workflow-state-machine.module';
import { WorkflowModule } from 'src/workflow/workflow.module';

@Module({
  imports: [WorkflowModule, WorkflowStateMachineModule],
  controllers: [],
  providers: [],
})
export class ProjectModule {}
