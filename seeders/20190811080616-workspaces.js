module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Workspaces',
      [
        {
          id: '80b46cd9-9363-4a20-9b7c-41396cc4ecb9',
          title: "John's Workspace",
          name: 'jfashion',
          createdBy: '78d9446b-e132-4dc0-b7f7-abb420fd6ddf',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Workspaces', null, {}),
};
