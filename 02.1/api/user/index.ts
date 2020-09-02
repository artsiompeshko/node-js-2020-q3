import express, { Router, Request, Response } from 'express';
import {
  // Use this as a replacement for express.Request
  ValidatedRequest,
} from 'express-joi-validation';

import { User, CreateUserInputDto, UpdateUserInputDto } from '02.1/interfaces/user/user.interface';
import { userService } from '02.1/services/user/user.service';
import validators, {
  CreateUserSchema,
  UpdateUserSchema,
} from '02.1/api/validators/user.validators';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response) => {
  const users: User[] = await userService.findAll();

  res.json(users);
});

router.get('/suggest', async (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query;

  const users: User[] = await userService.suggest(loginSubstring as string, +limit);

  res.json(users);
});

router.post(
  '/',
  validators.createUser,
  async (req: ValidatedRequest<CreateUserSchema>, res: Response) => {
    const userToCreate: CreateUserInputDto = req.body;

    const user: User = await userService.add(userToCreate);

    res.json(user);
  },
);

router.put(
  '/:id',
  validators.updateUser,
  async (req: ValidatedRequest<UpdateUserSchema>, res: Response) => {
    const { id } = req.params;
    const userToUpdate: UpdateUserInputDto = req.body;

    const user: User = await userService.update(id, userToUpdate);

    res.json(user);
  },
);

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const user: User = await userService.find(id);

  res.json(user);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const user: User = await userService.remove(id);

  res.json(user);
});

export { router };
