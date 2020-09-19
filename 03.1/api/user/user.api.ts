import express, { Router, Request, Response, NextFunction } from 'express';
import {
  // Use this as a replacement for express.Request
  ValidatedRequest,
} from 'express-joi-validation';

import { User, CreateUserInputDto, UpdateUserInputDto } from '03.1/interfaces/user/user.interface';
import { userService } from '03.1/services/user/user.service';
import validators, {
  CreateUserSchema,
  UpdateUserSchema,
} from '03.1/api/validators/user.validators';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: User[] = await userService.findAll();

    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get('/suggest', async (req: Request, res: Response, next: NextFunction) => {
  const { loginSubstring, limit } = req.query;
  try {
    const users: User[] = await userService.suggest(loginSubstring as string, +limit);

    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  validators.createUser,
  async (req: ValidatedRequest<CreateUserSchema>, res: Response, next: NextFunction) => {
    const userToCreate: CreateUserInputDto = req.body;
    try {
      const user: User = await userService.add(userToCreate);

      res.json(user);
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/:id',
  validators.updateUser,
  async (req: ValidatedRequest<UpdateUserSchema>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userToUpdate: UpdateUserInputDto = req.body;
    try {
      const user: User = await userService.update(id, userToUpdate);

      res.json(user);
    } catch (e) {
      next(e);
    }
  },
);

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user: User = await userService.find(+id);

    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result: boolean = await userService.remove(+id);

    res.send(result);
  } catch (e) {
    next(e);
  }
});

export { router };
