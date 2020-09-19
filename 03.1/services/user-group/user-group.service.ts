import { UserGroup } from '03.1/interfaces/user-group/user-group.interface';
import { userGroupRepository } from '03.1/repository/user-group/user-group.repository';

async function add(groupId: number, userIds: number[]): Promise<UserGroup> {
  return userGroupRepository.add(groupId, userIds);
}

const userGroupService = {
  add,
};

export { userGroupService };
