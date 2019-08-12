module.exports = (sequelize, DataTypes) => {
  const Workspaces = sequelize.define(
    'Workspace',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {},
  );
  Workspaces.associate = (models) => {
    const { User } = models;
    Workspaces.belongsTo(User, {
      foreignKey: 'createdBy',
    });
  };
  return Workspaces;
};
