import { Module } from '@nestjs/common';
import { SqsModule } from 'src/sqs/sqs.module';
import { SqsService } from 'src/sqs/sqs.service';
import { TaskController } from './task.controller';

@Module({
  imports: [SqsModule],
  controllers: [TaskController],
  providers: [SqsService],
})
export class TaskModule {}
