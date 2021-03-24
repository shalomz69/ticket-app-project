import { Listener, Subjects, TicketCreatedEvent } from '@szszsztickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { queueGroupname } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  queueGroupName = queueGroupname;
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  async onMessage(data: TicketCreatedEvent['data'], msg: Message){
      const {id, title, price} =data;
      const ticket = Ticket.build({
          id,
          title,
          price
      });
      await ticket.save();
      msg.ack();
      console.log('listener recieved message*****************')
  }
}
