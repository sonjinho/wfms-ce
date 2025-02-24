import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkflowEntity } from './workflow/adapter/persistence/workflow/entity/workflow.entity';
import { WorkflowModule } from './workflow/workflow.module';
import { WorkflowStepInputEntity } from './workflow/adapter/persistence/workflow/entity/workflow-step-input.entity';
import { WorkflowStepEntity } from './workflow/adapter/persistence/workflow/entity/workflow-step.entity';
import { ProjectModule } from './project/project.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProjectTimelineModule } from './project-timeline/project-timeline.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ProjectModule,
    ProjectTimelineModule,
    WorkflowModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1', // docker-compose에서 서비스 이름
      port: 5432,
      username: 'your_username', // docker-compose에서 설정한 사용자 이름
      password: 'your_password', // docker-compose에서 설정한 비밀번호
      database: 'workflow_ce', // docker-compose에서 설정한 데이터베이스 이름
      entities: [WorkflowEntity, WorkflowStepEntity, WorkflowStepInputEntity],
      synchronize: true, // 개발 중에는 true, 프로덕션에서는 false 권장
    }),
    ProjectModule,
    ProjectTimelineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
