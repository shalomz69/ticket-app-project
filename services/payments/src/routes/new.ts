import express, { request, Request, Response } from 'express';
import { body } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  validateRequest,
  authUser,
  AuthError,
  OrderStatus,
} from '@szszsztickets/common';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payments';
import { natsWrapper } from '../nats-wrapper';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';

const router = express.Router();

router.post(
  '/api/payments',
  authUser,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);

    console.log('inside paymentsssss');
    if (!order) {
      console.log(req.body);
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new AuthError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('cannot pay for cancelled order');
    }
    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });
    const payment = Payment.build({
      orderId: order.id,
      stripeId: charge.id,
    });
    await payment.save();
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });
    res.send({ success: true });
  }
);

export { router as createChargeRouter };
