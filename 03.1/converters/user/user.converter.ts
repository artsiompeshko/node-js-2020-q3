import { UserModel } from '03.1/models/user/user.module';
import { User } from '03.1/interfaces/user/user.interface';

const convertModelToUser = (userModel: UserModel): User => {
  const user: User = userModel.get();

  return user;
};

const convertModelsToUsers = (userModels: UserModel[]): User[] => {
  return userModels.map(userModel => convertModelToUser(userModel));
};

const userConverter = {
  convertModelToUser,
  convertModelsToUsers,
};

export { userConverter };
