'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Socrates',
        email: 'socrates@user.io',
        imgUrl:'https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/95644061-8d55-4450-9abe-33e72729301e.png?auto=format&size=50',
        bio:'The wisest man on earth; or at least thats what I have been called. Platos mentor. Father, husband, soldier. ',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'Nietzsche',
        email: 'nietzsche@user.io',
        imgUrl:'https://pbcdn1.podbean.com/imglogo/image-logo/788256/CoolNietzsche.jpg?s=hh-web-app',
        bio:'Misunderstood by many. Lover of classical greek art and mythos. Favorite composer: Wagner. Dionysus > Apollo. Currently on leave from my academic appointment.',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'Wittgenstein',
        email: 'wittgenstein@user.io',
        imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSew1ik0vm8JBDtU_hnI9DvIUW4LyOQfBfjlw&usqp=CAU',
        bio:`“I don't know why we are here, but I'm pretty sure that it is not in order to enjoy ourselves.” - me. This applies to both life itself and twitter.`,
        hashedPassword: bcrypt.hashSync('password'),
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
