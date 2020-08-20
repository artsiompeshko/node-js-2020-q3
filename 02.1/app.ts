import express, { Application } from 'express';
import morgan from 'morgan';

import { errorMiddlware } from '02.1/middlwares/error.middlware';
import { router as userRouter } from './api/user';

const port: number = +process.env.PORT || 3000;

const app: Application = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use(errorMiddlware);
