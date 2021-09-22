import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';

@Module({
  providers: [SqsService],
})
export class SqsModule {}
