import express, { Router, Request, Response, NextFunction } from 'express';
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
import validators, {
  AssignUsersToGroupUserSchema,
  CreateGroupSchema,
  UpdateGroupSchema,
} from '03.1/api/validators/group.validators';
import { userGroupService } from '03.1/services/user-group/user-group.service';
import { UserGroup } from '03.1/interfaces/user-group/user-group.interface';

const router: Router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groups: Group[] = await groupService.findAll();

    res.json(groups);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  validators.createGroup,
  async (req: ValidatedRequest<CreateGroupSchema>, res: Response, next: NextFunction) => {
    const groupToCreate: CreateGroupInputDto = req.body;
    try {
      const group: Group = await groupService.add(groupToCreate);

      res.json(group);
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/:id',
  validators.updateGroup,
  async (req: ValidatedRequest<UpdateGroupSchema>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const groupToUpdate: UpdateGroupInputDto = req.body;
    try {
      const group: Group = await groupService.update(id, groupToUpdate);

      res.json(group);
    } catch (e) {
      next(e);
    }
  },
);

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const group: Group = await groupService.find(+id);

    res.json(group);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result: boolean = await groupService.remove(+id);

    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/:id/assign-users',
  validators.assignUsersToGroups,
  async (
    req: ValidatedRequest<AssignUsersToGroupUserSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id: groupId } = req.params;
    const { userIds } = req.body;

    try {
      const result: UserGroup = await userGroupService.add(+groupId, userIds);

      res.send(result);
    } catch (e) {
      next(e);
    }
  },
);

export { router };
