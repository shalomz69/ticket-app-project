import express, { Request, Response,NextFunction } from 'express';
import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { errorHandler, NotFoundError } from '@szszsztickets/common';
import cookieSession from 'cookie-session';
import cors from 'cors'

const app = express();
app.set('trust proxy', true);
app.use(
  cookieSession({ signed: false, secure: false })
  );
app.use(json());
app.use(function(req:  Request, res: Response, next: NextFunction) {
  var allowedOrigins = 'https://proj.ticket-app-sz.website';
  res.header("Access-Control-Allow-Origin", allowedOrigins);
  next();
});
//app.use(cors())
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(currentUserRouter);
  
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler); 
export { app };
  