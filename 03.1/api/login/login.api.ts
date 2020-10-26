import express, { Router, Request, Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import validators, { LoginSchema } from '03.1/api/validators/login.validators';

import { loginService } from '03.1/services/login/login.service';
import { LoginResult } from '03.1/interfaces/login/login.interface';

const router: Router = express.Router();

router.post(
  '/login',
  validators.login,
  async (req: ValidatedRequest<LoginSchema>, res: Response, next: NextFunction) => {
    const { login, password }: { login: string; password: string } = req.body;

    try {
      const loginResult: LoginResult = await loginService.authenticate(login, password);

      if (!loginResult.success) {
        res.status(401).send(loginResult);
        return;
      }

      res.json(loginResult);
    } catch (e) {
      next(e);
    }
  },
);

export { router };
