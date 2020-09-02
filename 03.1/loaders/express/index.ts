import express, { Application } from 'express';
import morgan from 'morgan';

import { validationErrorMiddleware, errorMiddleware } from '03.1/middlwares/error.middlware';

import { router as userRouter } from '03.1/api/user/user.api';

const expressLoader = async (app: Application): Promise<void> => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use('/user', userRouter);
  app.use(validationErrorMiddleware);
  app.use(errorMiddleware);
};

export default expressLoader;
