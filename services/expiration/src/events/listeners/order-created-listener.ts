import { Subjects, Listener, OrderCreatedEvent } from '@szszsztickets/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this millisec to process job:', delay);
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );
    message.ack();
  }
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'expiration-service';
}
