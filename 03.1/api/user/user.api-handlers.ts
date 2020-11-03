import { Request, Response, NextFunction } from 'express';

import {
  // Use this as a replacement for express.Request
  ValidatedRequest,
} from 'express-joi-validation';

import { User, CreateUserInputDto, UpdateUserInputDto } from '03.1/interfaces/user/user.interface';
import { userService } from '03.1/services/user/user.service';
import { CreateUserSchema, UpdateUserSchema } from '03.1/api/validators/user.validators';

export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users: User[] = await userService.findAll();

    res.json(users);
  } catch (e) {
    next(e);
  }
}

export async function getSuggestions(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { loginSubstring, limit } = req.query;
  try {
    const users: User[] = await userService.suggest(loginSubstring as string, +limit);

    res.json(users);
  } catch (e) {
    next(e);
  }
}

export async function createUser(
  req: ValidatedRequest<CreateUserSchema>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userToCreate: CreateUserInputDto = req.body;
  try {
    const user: User = await userService.add(userToCreate);

    res.json(user);
  } catch (e) {
    next(e);
  }
}

export async function updateUser(
  req: ValidatedRequest<UpdateUserSchema>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.params;
  const userToUpdate: UpdateUserInputDto = req.body;
  try {
    const user: User = await userService.update(id, userToUpdate);

    res.json(user);
  } catch (e) {
    next(e);
  }
}

export async function findUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    const user: User = await userService.find(+id);

    res.json(user);
  } catch (e) {
    next(e);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  try {
    const result: boolean = await userService.remove(+id);

    res.send(result);
  } catch (e) {
    next(e);
  }
}
