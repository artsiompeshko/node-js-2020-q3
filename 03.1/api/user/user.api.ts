import express, { Router } from 'express';

import validators from '03.1/api/validators/user.validators';

import {
  findAll,
  getSuggestions,
  createUser,
  updateUser,
  findUser,
  deleteUser,
} from './user.api-handlers';

const router: Router = express.Router();

router.get('/list', findAll);
router.get('/suggest', getSuggestions);
router.post('/', validators.createUser, createUser);
router.put('/:id', validators.updateUser, updateUser);
router.get('/:id', findUser);
router.delete('/:id', deleteUser);

export { router };
