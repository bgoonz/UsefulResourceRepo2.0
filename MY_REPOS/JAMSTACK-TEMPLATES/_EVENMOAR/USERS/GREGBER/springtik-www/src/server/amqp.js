import amqp from 'amqplib';
import config from '../config';

let channel;

export const getChannel = async function () {
  if (!channel) {
    const connection = await amqp.connect(config.get('amqp.url'));
    channel = await connection.createChannel();
  }

  return channel;
};
