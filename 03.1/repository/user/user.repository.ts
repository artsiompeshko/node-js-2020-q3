import { UserModel } from '03.1/models/user/user.model';
import { User, CreateUserInputDto, UpdateUserInputDto } from '03.1/interfaces/user/user.interface';
import { userConverter } from '03.1/converters/user/user.converter';

async function findAll(): Promise<User[]> {
  const userModels: UserModel[] = await UserModel.findAll();

  return userConverter.convertModelsToUsers(userModels);
}

async function add(user: CreateUserInputDto): Promise<User> {
  const userModel = await UserModel.create(user, {
    fields: ['age', 'login', 'password'],
  });

  return userConverter.convertModelToUser(userModel);
}

async function find(id: number): Promise<User> {
  const userModel = await UserModel.findOne({
    where: { id },
  });

  if (!userModel) {
    return null;
  }

  return userConverter.convertModelToUser(userModel);
}

async function remove(id: number): Promise<boolean> {
  if (!id) {
    return null;
  }

  const userModel = await UserModel.destroy({
    where: { id },
  });

  return userModel === 1;
}

async function update(id: number, user: UpdateUserInputDto): Promise<User> {
  if (!id) {
    return null;
  }

  const [, userModels] = await UserModel.update(user, {
    where: { id },
    returning: true,
  });

  if (!userModels.length) {
    return null;
  }

  return userConverter.convertModelToUser(userModels[0]);
}

async function suggest(loginSubstring: string, limit: number): Promise<User[]> {
  const users = await findAll();

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
