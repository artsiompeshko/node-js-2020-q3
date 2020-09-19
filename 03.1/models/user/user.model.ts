import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  login: string;
  password: string;
  age: number;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes> {}

const init = ({ sequelize }: { sequelize: Sequelize }): void => {
  UserModel.init(
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      timestamps: false,
    },
  );
};

export { init, UserModel };
