import { Sequelize } from 'sequelize';

import { init as initModels } from '03.1/models';

const dbLoader = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize(process.env.DB_URI);

  await sequelize.authenticate();

  initModels({ sequelize });

  await sequelize.sync();

  console.log('All models were synchronized successfully.');

  return sequelize;
};

export default dbLoader;
