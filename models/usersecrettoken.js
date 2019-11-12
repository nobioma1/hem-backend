module.exports = (sequelize, DataTypes) => {
  const UserSecretToken = sequelize.define(
    'UserSecretToken',
    {
      userId: DataTypes.UUID,
      token: DataTypes.STRING,
    },
    {}
  );
  UserSecretToken.associate = models => {
    const { User } = models;
    UserSecretToken.belongsTo(User, {
      foreignKey: 'userId',
    });
  };
  return UserSecretToken;
};
