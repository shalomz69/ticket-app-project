import { PaymentCreatedEvent, Publisher, Subjects, TicketCreatedEvent } from '@szszsztickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
