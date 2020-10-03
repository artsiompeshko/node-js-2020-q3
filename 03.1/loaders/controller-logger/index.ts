import fs from 'fs';
import path from 'path';

import { Application, Request } from 'express';
import morgan from 'morgan';

// create a write stream (in append mode)
const errorLogStream = fs.createWriteStream(path.join(process.cwd(), 'controller-logs.log'), {
  flags: 'a',
});

morgan.token('args', (req: Request): string => {
  if (req.body && Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  }

  if (req.query && Object.keys(req.query).length) {
    return JSON.stringify(req.query);
  }

  return 'no args';
});

const controllerLoggerLoader = async (app: Application): Promise<void> => {
  app.use(
    morgan(':method :url :args :response-time', {
      stream: errorLogStream,
    }),
  );
};

export default controllerLoggerLoader;
