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
  cookieSession({ signed: false, secure: true
    //,domain: 'ticket-app-sz.website', sameSite: 'none' 
   })
  ); 
app.use(json());
app.use(
  cors({
    origin: ['https://proj.ticket-app-sz.website', 'https://ticket-app-sz.website'],
    methods: ['GET', 'POST'],
    credentials: true,
    exposedHeaders: ['set-cookie']
  })
) 
// app.use(function(req:  Request, res: Response, next: NextFunction) {
//   var allowedOrigins = 'https://proj.ticket-app-sz.website';
//   res.header("Access-Control-Allow-Origin", allowedOrigins)
//   //res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
// res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   ;
//   next();
// });
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
  