import { Application, Request } from 'express';
import morgan from 'morgan';

morgan.token('args', (req: Request): string => {
  if (req.body && Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  }

  if (req.query && Object.keys(req.query).length) {
    return JSON.stringify(req.query);
  }

  return 'no args';
});

const morganLoader = async (app: Application): Promise<void> => {
  app.use(morgan(':method :url :args :response-time'));
};

export default morganLoader;
