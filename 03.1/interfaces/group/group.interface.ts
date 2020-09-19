export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type Group = {
  id: number;
  name: string;
  permissions: Array<Permission>;
};

export type CreateGroupInputDto = {
  name: string;
  permissions: string;
};

export type UpdateGroupInputDto = {
  id: number;
  name: string;
  permissions: string;
};
