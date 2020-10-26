import jwt from 'jsonwebtoken';

import { LoginResult } from '03.1/interfaces/login/login.interface';
import { User } from '03.1/interfaces/user/user.interface';

import { userService } from '03.1/services/user/user.service';

function generateToken(user: User): string {
  const payload = { id: user.id, age: user.age };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  return token;
}

async function authenticate(login: string, password: string): Promise<LoginResult> {
  const user: User = await userService.findByCredentials(login, password);

  if (!user) {
    return {
      success: false,
      message: 'Please, recheck your login and password',
    };
  }

  return {
    success: true,
    token: generateToken(user),
  };
}

const loginService = {
  authenticate,
};

export { loginService };
