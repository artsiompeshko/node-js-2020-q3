import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface UserGroupAttributes {
  id: number;
  userId: number;
  groupId: number;
}

// Some attributes are optional in `Group.build` and `Group.create` calls
export interface UserGroupCreationAttributes extends Optional<UserGroupAttributes, 'id'> {}

class UserGroupModel extends Model<UserGroupAttributes, UserGroupCreationAttributes> {}

const init = ({ sequelize }: { sequelize: Sequelize }): void => {
  UserGroupModel.init(
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.NUMBER,
      },
      groupId: {
        type: DataTypes.NUMBER,
      },
    },
    {
      sequelize,
      tableName: 'user_group',
      modelName: 'UserGroup',
      timestamps: false,
      underscored: true,
    },
  );
};

export { init, UserGroupModel };
