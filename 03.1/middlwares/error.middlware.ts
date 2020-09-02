// After your routes add a standard express error handler. This will be passed the Joi
import { Request, Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';

// error, plus an extra "type" field so we can tell what type of validation failed
const validationErrorMiddleware = (
  err: any | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err?.error?.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      status: 'failed',
      message: err.error.toString(),
    });
  } else {
    // pass on to another error handler
    next(err);
  }
};

const errorMiddleware = (err: any, req: Request, res: Response): void => {
  res.status(500).send(err);
};

export { validationErrorMiddleware, errorMiddleware };
