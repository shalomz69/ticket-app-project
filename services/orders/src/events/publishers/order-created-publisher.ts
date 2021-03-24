import { Publisher, OrderCreatedEvent, Subjects } from '@szszsztickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
