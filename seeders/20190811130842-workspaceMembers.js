module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'WorkspaceMembers',
    [
      {
        id: 1,
        workspaceId: '80b46cd9-9363-4a20-9b7c-41396cc4ecb9',
        userId: '78d9446b-e132-4dc0-b7f7-abb420fd6ddf',
        isAdmin: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        workspaceId: '80b46cd9-9363-4a20-9b7c-41396cc4ecb9',
        userId: '407feede-3315-423f-9735-af880bdb3a9c',
        isAdmin: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        workspaceId: '80b46cd9-9363-4a20-9b7c-41396cc4ecb9',
        userId: '3f917ff7-3fa4-4a85-bd6b-f72f9f448a52',
        isAdmin: false,
        createdAt: new Date(),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Workspaces', null, {}),
};
