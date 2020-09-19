import { GroupModel } from '03.1/models/group/group.model';
import {
  Group,
  CreateGroupInputDto,
  UpdateGroupInputDto,
} from '03.1/interfaces/group/group.interface';
import { groupConverter } from '03.1/converters/group/group.converter';

async function findAll(): Promise<Group[]> {
  const groupModels: GroupModel[] = await GroupModel.findAll();

  return groupConverter.convertModelsToGroups(groupModels);
}

async function add(group: CreateGroupInputDto): Promise<Group> {
  const groupModel = await GroupModel.create(group, {
    fields: ['name', 'permissions'],
  });

  return groupConverter.convertModelToGroup(groupModel);
}

async function find(id: number): Promise<Group> {
  const groupModel = await GroupModel.findOne({
    where: { id },
  });

  if (!GroupModel) {
    return null;
  }

  return groupConverter.convertModelToGroup(groupModel);
}

async function remove(id: number): Promise<boolean> {
  if (!id) {
    return null;
  }

  const groupModel = await GroupModel.destroy({
    where: { id },
  });

  return groupModel === 1;
}

async function update(id: number, group: UpdateGroupInputDto): Promise<Group> {
  if (!id) {
    return null;
  }

  const [, groupModels] = await GroupModel.update(group, {
    where: { id },
    returning: true,
  });

  if (!groupModels.length) {
    return null;
  }

  return groupConverter.convertModelToGroup(groupModels[0]);
}

const groupRepository = {
  findAll,
  add,
  find,
  remove,
  update,
};

export { groupRepository };
