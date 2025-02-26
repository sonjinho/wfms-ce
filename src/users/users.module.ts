import { Module } from '@nestjs/common';
import { WorkflowAuthModule } from 'src/workflow-auth/workflow-auth.module';
import { UsersService } from './application/service/users.service';

@Module({
  imports: [WorkflowAuthModule],
  providers: [UsersService],
})
export class UsersModule {}
