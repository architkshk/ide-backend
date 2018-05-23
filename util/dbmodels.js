/**
 * Created by bhavyaagg on 23/05/18.
 */

const Sequelize = require('sequelize');
const U = require('./util')
const config = require('../config')


const sequelize = new Sequelize(config.db.DB, config.db.USER, config.db.PASSWORD, {
  dialect: config.db.DIALECT,
  host: config.db.HOST,
  port: config.db.PORT,
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  oneauthId: Sequelize.DataTypes.BIGINT,
  role: Sequelize.DataTypes.STRING
});

const AuthToken = sequelize.define('authtoken', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  accesstoken: {type: Sequelize.STRING, unique: true},
  clienttoken: {type: Sequelize.STRING, unique: true}
});

AuthToken.belongsTo(User);
User.hasOne(AuthToken);

sequelize.sync({force: false,}).then(() => {
  console.log("DATABASE Configured")
})

module.exports = {
  User,
  AuthToken
};
