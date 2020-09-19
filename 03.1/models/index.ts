import { Sequelize } from 'sequelize';

import { init as initUserModel } from './user/user.model';
import { init as initGroupModel } from './group/group.model';
import { init as initUserGroupModel } from './user-group/user-group.model';

type ModelDb = {
  sequelize?: Sequelize;
};

const db: ModelDb = {};

export const init = ({ sequelize }: { sequelize: Sequelize }): void => {
  db.sequelize = sequelize;

  initUserModel({ sequelize });
  initGroupModel({ sequelize });
  initUserGroupModel({ sequelize });
};

export { db };
