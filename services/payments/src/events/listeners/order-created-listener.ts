import {
  Subjects,
  Listener,
  OrderCreatedEvent,
  TicketUpdatedPublisher,
} from '@szszsztickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'payments-service';
  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    console.log('log the data ***************** ', data);
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();
    message.ack();
  }
}
