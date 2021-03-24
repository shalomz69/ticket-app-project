import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@szszsztickets/common';
import { BadRequestError } from '@szszsztickets/common';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email,  password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
      throw new BadRequestError('Email in use');
    }
    const user =  User.build({email, password});
    await user.save();
    //var jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!); 
    req.session = {
        jwt :token
    };
    return res.status(201).send(user)
  }
);

export { router as signupRouter };
