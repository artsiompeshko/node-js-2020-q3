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

const createUserBodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
});

export interface CreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  };
}

const updateUserBodySchema = Joi.object({
  id: Joi.number().required(),
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
});

export interface UpdateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: number;
    login: string;
    password: string;
    age: number;
  };
}

export default {
  createUser: validator.body(createUserBodySchema),
  updateUser: validator.body(updateUserBodySchema),
};
