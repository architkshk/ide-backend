'use strict';
module.exports = (sequelize, DataTypes) => {
  var AuthToken = sequelize.define('AuthToken', {
    accesstoken: DataTypes.STRING,
    clienttoken: DataTypes.STRING
  }, {});
  AuthToken.associate = function(models) {
    // associations can be defined here
    AuthToken.belongsTo(models.User)
  };
  return AuthToken;
};
