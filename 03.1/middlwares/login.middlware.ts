import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// error, plus an extra "type" field so we can tell what type of validation failed
const tokenCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    return res.status(401).send({
      message: 'Please, login to access this resource',
    });
  }

  return jwt.verify(token, secret, (err, userContext) => {
    if (err) {
      return res.status(403).send({
        message: 'Failed to authenticate token. Please, re-login to access this resource',
      });
    }

    return next();
  });
};

export { tokenCheckMiddleware };
