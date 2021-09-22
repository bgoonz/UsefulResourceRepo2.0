import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SqsService } from 'src/sqs/sqs.service';

@ApiBearerAuth()
@ApiTags('Tasks')
@Controller('/v1/tasks/:taskName')
export class TaskController {
  constructor(private readonly sqsService: SqsService) {}

  @Post()
  async submitTask(
    @Param('taskName') taskName: string,
    @Body() taskRequest: string,
  ) {
    const response = await this.sqsService.sendMessage({
      queueUrl: 'https://sqs.ap-south-1.amazonaws.com/728151625916/worker-src',
      message: taskRequest,
    });
    return response;
  }
}
