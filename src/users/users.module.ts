import { Module } from '@nestjs/common';
import { UsersService } from './application/service/users.service';

@Module({
  imports: [],
  providers: [UsersService],
})
export class UsersModule {}
