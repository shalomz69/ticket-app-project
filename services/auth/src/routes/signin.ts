import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';
import { validateRequest } from '@szszsztickets/common';
import { BadRequestError } from '@szszsztickets/common';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //   if(req.session){
    //     const token = req.session.jwt;
    //     jwt.verify(token,process.env.JWT_KEY!);
    // }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError(' invalid cred');
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError(' invalid cred');
    }
    var token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };
    return res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
