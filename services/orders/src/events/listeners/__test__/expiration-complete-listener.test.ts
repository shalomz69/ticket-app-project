import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { ExpirationCompleteEvent, OrderStatus } from '@szszsztickets/common';
import { Ticket } from '../../../models/ticket';
import { Order } from '../../../models/order';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concerst',
    price: 20,
  });

  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: '434',
    expiresAt: new Date(),
    ticket,
  });

  await order.save();
  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, order, ticket, data, msg };
};

it('update order status to canceled' , async () => {
    const  { listener, order, ticket, data, msg } = await setup();
    await listener.onMessage(data, msg);
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emit order canceeled event', async () => {
    const  { listener, order, ticket, data, msg } = await setup();
    await listener.onMessage(data,msg);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    const eventData =JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
    expect (eventData.id).toEqual(order.id);
});

it('ack the  message', async() =>{
    const  { listener, order, ticket, data, msg } = await setup();
    await listener.onMessage(data,msg);
    expect(msg.ack).toHaveBeenCalled()


})



// it('order status complete', async() =>{
//     const  { listener, order, ticket, data, msg } = await setup();
//     await listener.onMessage(data,msg);
//     expect(msg.ack).toHaveBeenCalled()


// })








