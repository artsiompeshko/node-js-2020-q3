import express, { Router } from 'express';
import validators from '03.1/api/validators/group.validators';

import {
  assignUsers,
  createGroup,
  findAll,
  findGroup,
  removeGroup,
  updateGroup,
} from './group.api-handlers';

const router: Router = express.Router();

router.get('/list', findAll);
router.post('/', validators.createGroup, createGroup);
router.put('/:id', validators.updateGroup, updateGroup);
router.get('/:id', findGroup);
router.delete('/:id', removeGroup);
router.post('/:id/assign-users', validators.assignUsersToGroups, assignUsers);

export { router };
