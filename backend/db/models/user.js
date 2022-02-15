'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, {foreignKey: 'userId'});

      User.hasMany(models.Tweet, {foreignKey: 'userId'});

      User.hasMany(models.Like, {foreignKey: 'userId'});
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    bio: DataTypes.TEXT,
    hashedPassword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
