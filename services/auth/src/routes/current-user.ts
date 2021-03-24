import express, { Request, Response } from 'express';
import 'express-async-errors';
import { authUser } from '@szszsztickets/common';
import { currentUser } from '@szszsztickets/common';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
