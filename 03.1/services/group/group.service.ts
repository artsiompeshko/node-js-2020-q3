import {
  Group,
  CreateGroupInputDto,
  UpdateGroupInputDto,
} from '03.1/interfaces/group/group.interface';
import { groupRepository } from '03.1/repository/group/group.repository';

async function findAll(): Promise<Group[]> {
  return groupRepository.findAll();
}

async function add(group: CreateGroupInputDto): Promise<Group> {
  return groupRepository.add(group);
}

async function find(id: number): Promise<Group> {
  return groupRepository.find(id);
}

async function remove(id: number): Promise<boolean> {
  return groupRepository.remove(id);
}

async function update(id: number, group: UpdateGroupInputDto): Promise<Group> {
  return groupRepository.update(id, group);
}

const groupService = {
  findAll,
  add,
  find,
  remove,
  update,
};

export { groupService };
