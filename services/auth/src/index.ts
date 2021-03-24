import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  try {
    console.log('dev add');

    console.log('starting up....startersingbnnnn');

    //process.env.JWT_KEY = 'aasd';
    if (!process.env.JWT_KEY) {
      throw new Error('jwt key must  be defined');
    }
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log('listening on 3000');
});
start();
