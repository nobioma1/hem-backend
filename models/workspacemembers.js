module.exports = (sequelize, DataTypes) => {
  const WorkspaceMembers = sequelize.define(
    'WorkspaceMembers',
    {
      workspaceId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );
  WorkspaceMembers.associate = (models) => {
    const { User, Workspace } = models;
    WorkspaceMembers.belongsTo(Workspace, {
      foreignKey: 'workspaceId',
    });
    WorkspaceMembers.belongsTo(User, {
      foreignKey: 'userId',
    });
  };
  return WorkspaceMembers;
};
