module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('WorkspaceMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workspaceId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),
  down: queryInterface => queryInterface.dropTable('WorkspaceMembers'),
};
