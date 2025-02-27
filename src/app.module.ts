import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectTimelineModule } from './project-timeline/project-timeline.module';
import { ProjectModule } from './project/project.module';
import { UsersModule } from './users/users.module';
import { WorkflowAuthModule } from './workflow-auth/workflow-auth.module';
import { WorkflowEventModule } from './workflow-event/workflow-event.module';
import { WorkflowModule } from './workflow/workflow.module';

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
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // 개발 중에는 true, 프로덕션에서는 false 권장
    }),
    ProjectModule,
    ProjectTimelineModule,
    WorkflowEventModule,
    WorkflowAuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
