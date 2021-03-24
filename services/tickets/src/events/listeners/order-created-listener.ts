import {
  Subjects,
  Listener,
  OrderCreatedEvent,
  TicketUpdatedPublisher,
} from '@szszsztickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    ticket.set({ orderId: data.id });
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
      orderId: ticket.orderId,
      userId: ticket.userId,
    });
    message.ack();
    console.log('ticket listener recieved message*****************');
  }
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'tickets-service';
}
