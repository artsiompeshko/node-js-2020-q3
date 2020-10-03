import { UserGroupModel } from '03.1/models/user-group/user-group.model';
import { UserGroup } from '03.1/interfaces/user-group/user-group.interface';

import { userGroupConverter } from '03.1/converters/user-group/user-group.converter';

import { db } from '03.1/models';

async function add(groupId: number, userIds: number[]): Promise<UserGroup> {
  const groupModels = await db.sequelize.transaction(async () => {
    const result: UserGroupModel[] = await UserGroupModel.bulkCreate(
      userIds.map(userId => ({
        userId,
        groupId,
      })),
      {
        fields: ['groupId', 'userId'],
      },
    );

    return result;
  });

  return userGroupConverter.convertModelToUserGroup(groupModels);
}

const userGroupRepository = {
  add,
};

export { userGroupRepository };
