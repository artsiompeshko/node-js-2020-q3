export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type CreateUserInputDto = {
  login: string;
  password: string;
  age: number;
};

export type UpdateUserInputDto = {
  id: string;
  login: string;
  password: string;
  age: number;
};
