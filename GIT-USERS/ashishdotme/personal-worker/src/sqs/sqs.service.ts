import { Injectable } from '@nestjs/common';
import { SQSRecord } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { SQS } from 'aws-sdk';
import { chunk } from 'lodash';

@Injectable()
export class SqsService {
  private sqs: SQS;
  constructor() {
    this.sqs = new AWS.SQS();
  }

  async sendMessage({
    queueUrl,
    message,
    messageGroupId = undefined,
  }: {
    queueUrl: string;
    message: any;
    messageGroupId?: string;
  }) {
    await this.sqs
      .sendMessage({
        QueueUrl: queueUrl,
        MessageBody: message,
        MessageGroupId: messageGroupId,
      })
      .promise();
  }

  async processMessages({
    queueUrl,
    messages,
    handler,
  }: {
    queueUrl: string;
    messages: SQSRecord[];
    handler: (message: SQSRecord) => any;
  }) {
    const processedResults = await Promise.all(
      messages.map(
        async (message) =>
          await this.processSingleMessage({ message, handler }),
      ),
    );

    const hasPartialFailures = processedResults.some(
      (result) => !result.success,
    );
    if (!hasPartialFailures) {
      return;
    }
    const successMessages = processedResults
      .filter((result) => result.success)
      .map((result) => result.message);
    const failedMessageIds = processedResults
      .filter((result) => !result.success)
      .map((result) => result.message.messageId);
    await this.deleteMessages({ queueUrl, messages: successMessages });
    throw new Error('Message Batch not processed successfully');
  }

  async processSingleMessage({
    message,
    handler,
  }: {
    message: SQSRecord;
    handler: (message: SQSRecord) => any;
  }) {
    try {
      const result = await handler(message);
      return { success: true, result, message };
    } catch (error) {
      return { success: false, error, message };
    }
  }

  async deleteMessages({
    queueUrl,
    messages,
  }: {
    queueUrl: string;
    messages: SQSRecord[];
  }) {
    if (!messages.length) {
      return;
    }
    const messageChunks = chunk(messages, 10);
    for (const messageChunk of messageChunks) {
      await this.sqs
        .deleteMessageBatch({
          Entries: messageChunk.map((message) => ({
            Id: message.messageId,
            ReceiptHandle: message.receiptHandle,
          })),
          QueueUrl: queueUrl,
        })
        .promise();
    }
  }
}
