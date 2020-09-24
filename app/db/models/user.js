"use strict"
var bcrypt = require("bcrypt")
const {
  Model
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    paranoid: true,
    sequelize,
    modelName: "User",
  })
  // eslint-disable-next-line no-unused-vars
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => { 
        throw new Error() 
      })
  })
  return User
}