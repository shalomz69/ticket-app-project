import express, { Request, Response,NextFunction  } from 'express';

import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { errorHandler, NotFoundError } from '@szszsztickets/common';
import cookieSession from 'cookie-session';
import cors from 'cors';

const app = express();
app.set('trust proxy', true);
app.use(
  cookieSession({ signed: false, secure: false })
);
//app.use(cors());
app.all('*', (req: Request, res: Response, next:NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header( "Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers: Content-Type, *");
  next();
});
app.use(json());
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(currentUserRouter);

// app.all('*', () => {
//   throw new NotFoundError();
// });
app.use(errorHandler);
export { app };
