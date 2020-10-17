import { User, CreateUserInputDto, UpdateUserInputDto } from '03.1/interfaces/user/user.interface';
import { userRepository } from '03.1/repository/user/user.repository';

async function findAll(): Promise<User[]> {
  return userRepository.findAll();
}

async function add(user: CreateUserInputDto): Promise<User> {
  return userRepository.add(user);
}

async function find(id: number): Promise<User> {
  return userRepository.find(id);
}

async function findByCredentials(login: string, password: string): Promise<User> {
  return userRepository.findByCredentials(login, password);
}

async function remove(id: number): Promise<boolean> {
  return userRepository.remove(id);
}

async function update(id: number, user: UpdateUserInputDto): Promise<User> {
  return userRepository.update(id, user);
}

async function suggest(loginSubstring: string, limit: number): Promise<User[]> {
  return userRepository.suggest(loginSubstring, limit);
}

const userService = {
  findAll,
  add,
  find,
  remove,
  update,
  suggest,
  findByCredentials,
};

export { userService };
