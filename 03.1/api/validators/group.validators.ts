import * as Joi from '@hapi/joi';

import {
  ContainerTypes,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';

const validator = createValidator({
  passError: true,
});

const createGroupBodySchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.string(),
});

export interface CreateGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    permissions: string;
  };
}

const updateGroupBodySchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  permissions: Joi.string(),
});

export interface UpdateGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: number;
    name: string;
    permissions: string;
  };
}

const assignUsersToGroupBodySchema = Joi.object({
  userIds: Joi.array().items(Joi.number()).required(),
});

export interface AssignUsersToGroupUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    userIds: number[];
  };
}

export default {
  createGroup: validator.body(createGroupBodySchema),
  updateGroup: validator.body(updateGroupBodySchema),
  assignUsersToGroups: validator.body(assignUsersToGroupBodySchema),
};
