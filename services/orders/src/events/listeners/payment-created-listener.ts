import {
  Listener,
  Subjects,
  PaymentCreatedEvent,
  OrderStatus,
} from '@szszsztickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupname } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly queueGroupName = queueGroupname;
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const { orderId, id, stripeId } = data;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('order not found');
    }
    order.set({ status: OrderStatus.Complete });
    await order.save();
    msg.ack();
  }
}
