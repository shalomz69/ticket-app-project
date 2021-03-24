import {
    Subjects,
    Listener,
    OrderCreatedEvent,
    TicketUpdatedPublisher,
    OrderCancelledEvent,
    OrderStatus,
  } from '@szszsztickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
  
  export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    async onMessage(data: OrderCancelledEvent['data'], message: Message) {
      console.log('order cancelled listener' ,data,' @date', new Date());
      const order = await Order.findOne({_id: data.id, version: data.version -1});
      if (!order) {
        throw new Error('Order not found')
      }
      order.set({ status: OrderStatus.Cancelled });
      await order.save();
      message.ack();
    }
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = 'payments-service';
  }