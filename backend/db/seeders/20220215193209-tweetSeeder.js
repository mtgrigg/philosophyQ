'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


      await queryInterface.bulkInsert('Tweets', [
        {
        userId: 1,
        imgUrl: '',
        tweet:'Holy cow!!',

      },
      {
        userId: 1,
        imgUrl: '',
        tweet:'Holy cow2!!',

      },

    ], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Tweets', null, {});

  }
};
