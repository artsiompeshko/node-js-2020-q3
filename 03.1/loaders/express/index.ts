import express, { Application } from 'express';
import cors from 'cors';

import { validationErrorMiddleware, errorMiddleware } from '03.1/middlwares/error.middlware';
import { tokenCheckMiddleware } from '03.1/middlwares/login.middlware';

import { router as userRouter } from '03.1/api/user/user.api';
import { router as groupRouter } from '03.1/api/group/group.api';
import { router as loginRouter } from '03.1/api/login/login.api';

const expressLoader = async (app: Application): Promise<void> => {
  // allow any origin for now
  app.use(cors());
  app.use(express.json());
  app.use('/user', tokenCheckMiddleware, userRouter);
  app.use('/group', tokenCheckMiddleware, groupRouter);
  app.use('/', loginRouter);
  app.use(validationErrorMiddleware);
  app.use(errorMiddleware);
};

export default expressLoader;
