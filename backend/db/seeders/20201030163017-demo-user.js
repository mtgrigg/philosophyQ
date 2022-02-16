'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Demo-lition',
        email: 'demo@user.io',
        imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTED50wZ1HCLB0madDUClOFjR08OuCyF-xDsA&usqp=CAU',
        bio:'big honkey tonkey',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'FakeUser1',
        email: faker.internet.email(),
        imgUrl:'',
        bio:'big honkey tonkey 1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        username: 'FakeUser2',
        email: faker.internet.email(),
        imgUrl:'',
        bio:'big honkey tonkey 2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
