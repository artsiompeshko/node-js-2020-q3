import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface GroupAttributes {
  id: number;
  name: string;
  permissions: string;
}

// Some attributes are optional in `Group.build` and `Group.create` calls
export interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

class GroupModel extends Model<GroupAttributes, GroupCreationAttributes> {}

const init = ({ sequelize }: { sequelize: Sequelize }): void => {
  GroupModel.init(
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'groups',
      modelName: 'Group',
      timestamps: false,
    },
  );
};

export { init, GroupModel };
