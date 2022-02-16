'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Tweet.belongsTo(models.User, {foreignKey: "userId", hooks: true})
    }
  };
  Tweet.init({
    userId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    tweet: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};
