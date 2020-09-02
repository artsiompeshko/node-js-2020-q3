export type User = {
  id: number;
  login: string;
  password: string;
  age: number;
};

export type CreateUserInputDto = {
  login: string;
  password: string;
  age: number;
};

export type UpdateUserInputDto = {
  id: number;
  login: string;
  password: string;
  age: number;
};
