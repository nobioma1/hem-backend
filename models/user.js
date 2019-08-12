const {
  passwordHash: { hashPassword },
} = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileURL: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
      },
    },
  );
  User.associate = (models) => {
    const { UserSecretToken, Workspace } = models;
    User.hasOne(UserSecretToken, {
      foreignKey: 'userId',
      as: 'userSecretToken',
    });
    User.hasMany(Workspace, {
      foreignKey: 'createdBy',
      as: 'workspace',
    });
  };
  return User;
};
