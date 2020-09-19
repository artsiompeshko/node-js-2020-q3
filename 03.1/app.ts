import express, { Application } from 'express';

import { expressLoader, dbLoader } from '03.1/loaders';

const port: number = +process.env.PORT || 3000;

async function startServer() {
  const app: Application = express();

  await expressLoader(app);
  await dbLoader();

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

startServer();