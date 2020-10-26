import { Group, Permission } from '03.1/interfaces/group/group.interface';

export const mockGroups: Group[] = [
  {
    id: 1,
    name: 'test',
    permissions: ['READ'],
  },
  {
    id: 2,
    name: 'students',
    permissions: ['WRITE'],
  },
];
