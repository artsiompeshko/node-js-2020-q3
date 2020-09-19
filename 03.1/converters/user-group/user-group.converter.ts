import { UserGroupModel } from '03.1/models/user-group/user-group.model';
import { UserGroup } from '03.1/interfaces/user-group/user-group.interface';

const convertModelToUserGroup = (userGroupModels: UserGroupModel[]): UserGroup => {
  const { groupId } = userGroupModels[0].get();

  const userIds = userGroupModels.map(userGroupModel => {
    const { userId } = userGroupModel.get();

    return userId;
  });

  return {
    groupId,
    userIds,
  };
};

const userGroupConverter = {
  convertModelToUserGroup,
};

export { userGroupConverter };
