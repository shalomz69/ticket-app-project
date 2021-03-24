import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { authUser, validateRequest,TicketCreatedPublisher } from '@szszsztickets/common';
import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

//  const stan = nats.connect('ticketing', 'tickets', {
//    url: 'http://nats-srv:4222', });




router.post(
  '/api/tickets',
  authUser,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version
    })

    const event = {
      type: 'ticket:created',
      data: ticket,
    };
    res.status(201).send(ticket);
    });

    
  


export { router as createTicketRouter };
