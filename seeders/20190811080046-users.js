const { hashPassword } = require('../helpers/passwordHash');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '78d9446b-e132-4dc0-b7f7-abb420fd6ddf',
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@demo.com',
          password: hashPassword('demo'),
          profileURL: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '407feede-3315-423f-9735-af880bdb3a9c',
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'jane@demo.com',
          password: hashPassword('demo'),
          profileURL: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3f917ff7-3fa4-4a85-bd6b-f72f9f448a52',
          firstname: 'unknown',
          lastname: 'unknown',
          email: 'unknown@demo.com',
          password: hashPassword('demo'),
          profileURL: '',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
