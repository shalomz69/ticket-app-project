import { Subjects, Publisher, OrderCancelledEvent } from '@szszsztickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
