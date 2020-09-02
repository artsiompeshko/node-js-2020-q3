import { v4 as uuidv4 } from 'uuid';

import { User, CreateUserInputDto, UpdateUserInputDto } from '02.1/interfaces/user/user.interface';

let users: User[] = [];

async function findAll(): Promise<User[]> {
  return users;
}

async function add(user: CreateUserInputDto): Promise<User> {
  const userToAdd: User = {
    ...user,
    isDeleted: false,
    id: uuidv4(),
  };

  users.push(userToAdd);

  return userToAdd;
}

async function find(id: string): Promise<User> {
  if (!id) {
    return null;
  }

  return users.find(user => user.id === id);
}

async function remove(id: string): Promise<User> {
  if (!id) {
    return null;
  }

  users = users.map(u => {
    if (u.id === id) {
      return {
        ...u,
        isDeleted: true,
      };
    }

    return u;
  });

  return find(id);
}

async function update(id: string, user: UpdateUserInputDto): Promise<User> {
  if (!id) {
    return null;
  }

  users = users.map(u => {
    if (u.id === id) {
      return {
        ...u,
        ...user,
      };
    }

    return u;
  });

  return find(id);
}

async function suggest(loginSubstring: string, limit: number): Promise<User[]> {
  return users
    .sort((user1, user2) => {
      if (user1.login < user2.login) {
        return -1;
      }

      if (user1.login > user2.login) {
        return 1;
      }

      return 0;
    })
    .filter(user => user.login.includes(loginSubstring))
    .slice(0, limit);
}

const userRepository = {
  findAll,
  add,
  find,
  remove,
  update,
  suggest,
};

export { userRepository };
