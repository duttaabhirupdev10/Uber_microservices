const dotenv = require('dotenv');
dotenv.config();
const amqplib = require('amqplib');

let channel;

async function connect() {
  try {
    const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
    const connection = await amqplib.connect(rabbitUrl);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
}

async function subscribeToQueue(queue, onMessage) {
  if (!channel) {
    console.error('RabbitMQ channel is not initialized');
    return;
  }

  try {
    await channel.assertQueue(queue, { durable: true });
    await channel.consume(
      queue,
      (msg) => {
        if (msg) {
          onMessage(msg.content.toString());
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error('RabbitMQ subscribe error:', error);
  }
}

async function publishToQueue(queue, message) {
  if (!channel) {
    console.error('RabbitMQ channel is not initialized');
    return;
  }

  try {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  } catch (error) {
    console.error('RabbitMQ publish error:', error);
  }
}

module.exports = {
  connect,
  subscribeToQueue,
  publishToQueue,
};