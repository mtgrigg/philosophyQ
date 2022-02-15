'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Comments', [
        {
          userId: 1,
          tweetId: 1,
          comment:'I love Holy cow!!',

        },
        {
          userId: 1,
          tweetId: 1,
          comment:'I love Holy cow2!!',

        },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Comments', null, {});

  }
};
