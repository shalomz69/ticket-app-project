import {
  Subjects,
  Listener,
  OrderCreatedEvent,
  TicketUpdatedPublisher,
  OrderCancelledEvent,
} from '@szszsztickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  async onMessage(data: OrderCancelledEvent['data'], message: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    ticket.set({ orderId: undefined });
    console.log('tickettttttttttttttttttttt resettttttttttttttttttttttt');
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
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = 'tickets-service';
}
