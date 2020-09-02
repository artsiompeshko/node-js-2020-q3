import { Sequelize } from 'sequelize';

import { init as initModels } from '03.1/models';

const dbLoader = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize(
    'postgres://master:admin123@node-js-2020-q3.cev5zkg19b7z.eu-west-1.rds.amazonaws.com:5432/postgres',
  );

  await sequelize.authenticate();

  initModels({ sequelize });

  await sequelize.sync();

  console.log('All models were synchronized successfully.');

  return sequelize;
};

export default dbLoader;
