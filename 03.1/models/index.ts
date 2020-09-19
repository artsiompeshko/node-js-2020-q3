import { Sequelize } from 'sequelize';

import { init as initUserModel } from './user/user.module';

export const init = ({ sequelize }: { sequelize: Sequelize }): void => {
  initUserModel({ sequelize });
};
