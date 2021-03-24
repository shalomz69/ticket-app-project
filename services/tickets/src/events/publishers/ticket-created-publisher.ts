import { Publisher, Subjects, TicketCreatedEvent } from '@szszsztickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
