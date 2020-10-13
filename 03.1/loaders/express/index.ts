import express, { Application } from 'express';

import { validationErrorMiddleware, errorMiddleware } from '03.1/middlwares/error.middlware';

import { router as userRouter } from '03.1/api/user/user.api';
import { router as groupRouter } from '03.1/api/group/group.api';

const expressLoader = async (app: Application): Promise<void> => {
  app.use(express.json());
  app.use('/user', userRouter);
  app.use('/group', groupRouter);
  app.use(validationErrorMiddleware);
  app.use(errorMiddleware);
};

export default expressLoader;
