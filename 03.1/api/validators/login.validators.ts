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

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
});

export interface LoginSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
  };
}

export default {
  login: validator.body(loginSchema),
};
