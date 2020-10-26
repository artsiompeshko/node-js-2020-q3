import { Request, Response, NextFunction } from 'express';
import {
  // Use this as a replacement for express.Request
  ValidatedRequest,
} from 'express-joi-validation';

import {
  Group,
  CreateGroupInputDto,
  UpdateGroupInputDto,
} from '03.1/interfaces/group/group.interface';
import { groupService } from '03.1/services/group/group.service';
import {
  AssignUsersToGroupUserSchema,
  CreateGroupSchema,
  UpdateGroupSchema,
} from '03.1/api/validators/group.validators';
import { userGroupService } from '03.1/services/user-group/user-group.service';
import { UserGroup } from '03.1/interfaces/user-group/user-group.interface';

export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const groups: Group[] = await groupService.findAll();

    res.json(groups);
  } catch (e) {
    next(e);
  }
}

export async function createGroup(
  req: ValidatedRequest<CreateGroupSchema>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const groupToCreate: CreateGroupInputDto = req.body;
  try {
    const group: Group = await groupService.add(groupToCreate);

    res.json(group);
  } catch (e) {
    next(e);
  }
}

export async function updateGroup(
  req: ValidatedRequest<UpdateGroupSchema>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.params;
  const groupToUpdate: UpdateGroupInputDto = req.body;
  try {
    const group: Group = await groupService.update(id, groupToUpdate);

    res.json(group);
  } catch (e) {
    next(e);
  }
}

export async function findGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    const group: Group = await groupService.find(+id);

    res.json(group);
  } catch (e) {
    next(e);
  }
}

export async function removeGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  try {
    const result: boolean = await groupService.remove(+id);

    res.send(result);
  } catch (e) {
    next(e);
  }
}

export async function assignUsers(
  req: ValidatedRequest<AssignUsersToGroupUserSchema>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id: groupId } = req.params;
  const { userIds } = req.body;

  try {
    const result: UserGroup = await userGroupService.add(+groupId, userIds);

    res.send(result);
  } catch (e) {
    next(e);
  }
}
