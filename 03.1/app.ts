import express, { Application } from 'express';
import dotenv from 'dotenv';

import { expressLoader, dbLoader, controllerLoggerLoader, processErrorsLoader } from '03.1/loaders';

dotenv.config();

const port: number = +process.env.PORT || 3000;

async function startServer() {
  const app: Application = express();

  await controllerLoggerLoader(app);
  await expressLoader(app);
  await dbLoader();

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

processErrorsLoader();
startServer();

// test uncaught exception
// setTimeout(() => {
//   throw new Error('uncaught exception');
// }, 5000);

// test unhandled rejection
// setTimeout(() => {
//   Promise.reject(new Error('promise rejected'));
// }, 5000);
