import { GroupAttributes, GroupModel } from '03.1/models/group/group.model';
import { Group, Permission } from '03.1/interfaces/group/group.interface';

const convertModelToGroup = (groupModel: GroupModel): Group => {
  const groupAttrs: GroupAttributes = groupModel.get();

  const group: Group = {
    id: groupAttrs.id,
    name: groupAttrs.name,
    permissions: groupAttrs?.permissions?.split(',') as Permission[],
  };

  return group;
};

const convertModelsToGroups = (groupModels: GroupModel[]): Group[] => {
  return groupModels.map(groupModel => convertModelToGroup(groupModel));
};

const groupConverter = {
  convertModelToGroup,
  convertModelsToGroups,
};

export { groupConverter };
